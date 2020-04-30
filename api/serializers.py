from api.models import Symptom, Condition, Diagnosis
from rest_framework import serializers


class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ['id', 'name', 'count']

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = ['id', 'name', 'count']

class DiagnosisSerializer(serializers.ModelSerializer):
    condition = ConditionSerializer()
    symptom_count = serializers.IntegerField(source='symptom.count', read_only=True)

    class Meta:
        model = Diagnosis
        fields = ['condition', 'count', 'symptom_count']