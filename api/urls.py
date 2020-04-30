from django.urls import include, path
from rest_framework import routers
from . import views

urlpatterns = [
    path('symptoms/', views.SymptomsView.as_view()),
    path('diagnoses/', views.DiagnosesView.as_view())
]
