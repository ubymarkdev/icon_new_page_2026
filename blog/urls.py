from django.urls import path
from . import views 

urlpatterns = [
    path("",views.pagina_blog,name="blog")
]