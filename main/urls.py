from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('documents/', views.documents, name='documents'),
    path('documents/<int:pk>/', views.document_detail, name='document_detail'),
    path('documents/<int:pk>/edit/', views.document_edit, name='document_edit'),
    path('settings/', views.settings_view, name='settings'),
    path('feature-demo/', views.feature_demo, name='feature_demo'),
]
