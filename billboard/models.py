from django.db import models
from django.contrib.auth.models import User


class Adds(models.Model):
    title = models.CharField(max_length=50, null=False)
    content = models.CharField(max_length=600, null=False)
    date_posted = models.DateTimeField('post date')
    author = models.CharField(max_length=20, null=False)


