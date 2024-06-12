"""
URL configuration for back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from base.views import CreateUserView, DeleteUserView, getUserDetails, update_user


urlpatterns = [
    path('admin/', admin.site.urls),
    path("base/user/register/", CreateUserView.as_view(), name="register"),
    path("base/user/update/", update_user, name='update-user'),
    path("base/user/delete/<int:pk>/", DeleteUserView.as_view(), name='delete-user'),
    path("base/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("base/token/refresh/" , TokenRefreshView.as_view(), name="refresh"),
    path('base/user/', getUserDetails, name='get_user_details'),
    path("base/",include("base.urls")),
    path("base-auth/", include("rest_framework.urls")),
    
]
