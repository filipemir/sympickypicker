from django.http import HttpResponse
from api.models import Symptom, Diagnosis, Condition
from api.serializers import SymptomSerializer, DiagnosisSerializer
from django.views import View
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response

class SymptomsView(generics.ListAPIView):
    queryset = Symptom.objects.all().order_by('-count')
    serializer_class = SymptomSerializer

class DiagnosesView(generics.ListCreateAPIView):
    queryset = Diagnosis.objects.all().order_by('-count')
    serializer_class = DiagnosisSerializer

    def get(self, request):
        symptom = request.GET.get('symptom')
        queryset = self.get_queryset().filter(symptom=symptom).order_by('-count')

        if (not queryset):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(page, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        symptomSet = Symptom.objects.filter(id=data.get("symptom"))
        conditionSet = Condition.objects.filter(id=data.get("condition"))

        if (not symptomSet or not conditionSet):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        symptom = symptomSet[0]
        condition = conditionSet[0]
        diagnosisSet = Diagnosis.objects.filter(condition=condition, symptom=symptom)

        if (not diagnosisSet):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        diagnosis = diagnosisSet[0]

        symptom.count += 1
        symptom.save()

        condition.count += 1
        condition.save()

        diagnosis.count += 1
        diagnosis.save()

        return Response(status=status.HTTP_200_OK)

