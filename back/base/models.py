from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="categories")

    def __str__(self):
        return self.name

class Note(models.Model):
    
    title = models.CharField(max_length=50)
    body  = models.CharField(max_length=500, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,  on_delete=models.CASCADE,related_name="notes")

    def __str__(self):
        return self.title