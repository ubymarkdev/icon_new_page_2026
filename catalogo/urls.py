from django.urls import path
from . import views

urlpatterns = [
    path("", views.pagina_catalogo, name="catalogo"),
    path("producto/<slug:slug>/", views.producto_detalle, name="producto_detalle"),
]
