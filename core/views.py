from django.shortcuts import render
from .models import Slide_home
from .models import Slide_clientes
# Create your views here.

def home (request):
    slides = Slide_home.objects.filter(is_active = True). order_by("order") 
    slides_clientes = Slide_clientes.objects.filter(is_active = True). order_by("order")   
    return render (request, "core/core.html", {"slides": slides, "slides_clientes": slides_clientes})


 