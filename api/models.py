from django.db import models

class Condition(models.Model):
    name = models.CharField(max_length=350)
    count = models.IntegerField(default=0)
    def __str__(self):
        return self.name

class Symptom(models.Model):
    name = models.CharField(max_length=350)
    count = models.IntegerField(default=0)
    def __str__(self):
        return self.name

class Diagnosis(models.Model):
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)
