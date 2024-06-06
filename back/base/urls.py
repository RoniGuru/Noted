from django.urls import path
from . import views

urlpatterns = [

   path('color-choices/', views.color_choices, name='color-choices'),
   path("categories/", views.CategoryListCreate.as_view(), name="categories-list"),
   path("categories/update/<int:pk>/", views.CategoryUpdate.as_view(), name="update-category"),
   path("categories/delete/<int:pk>/", views.CategoryDelete.as_view(), name="delete-category"),
   

    path("notes/", views.NoteListCreate.as_view(), name="notes-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/update/<int:pk>/", views.NoteUpdate.as_view(), name="update-note"),

    
]