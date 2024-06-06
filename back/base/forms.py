from django.forms import ModelForm
from .models import Note


from django.contrib.auth.models import User


class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = "__all__" #gives all fields from room fields     


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username','email']