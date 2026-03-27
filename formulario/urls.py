from django.urls import path
from . import views
from .views import contacto_form

urlpatterns = [
    path("", views.pagina_formulario, name="formulario"),
    path ("form/", contacto_form, name="contacto_form"), 
    
]