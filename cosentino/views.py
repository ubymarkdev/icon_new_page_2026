from django.shortcuts import render


# Create your views here.
def pagina_cosentino(request):
    return render(request, "cosentino/cosentino.html")