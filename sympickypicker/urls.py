from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/', include('api.urls')),
    url(r'^', views.ReactAppView.as_view())
]
