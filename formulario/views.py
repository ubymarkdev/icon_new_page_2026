from django.shortcuts import render, redirect
from urllib.parse import quote
from .forms import leadForm
import random


# Create your views here.
def pagina_formulario(request):
    form = leadForm()
    return render(request, "formulario/formulario.html", {"form": form})


def contacto_form(request):
    if request.method == "POST":
        form = leadForm(request.POST)

        if form.is_valid():
            lead = form.save()
            canal = lead.canal

            if canal in {"transformador", "marmolero", "distribuidor", "constructora", "inmobiliaria"}:
                numero = "3315848177"
            elif canal in {"carpintero", "cocinista", "mueblero"}:
                numero = "3318103604"
            elif canal in {"arquitecto", "ingeniero"}:
                numero = "3324493433"
            elif canal == "cliente_particular":
                numeros_particular = ["3315848177", "3318103604", "3324493433"]
                numero = random.choice(numeros_particular)
            else:
                numero = "3315848177"

            mensaje = quote(
                f"Hola, soy {lead.nombre} de la empresa {lead.empresa} y quiero información sobre {lead.requerimiento}"
            )
            url = f"https://wa.me/{numero}?text={mensaje}"
            return redirect(url)

    else:
        form = leadForm()

    return render(request, "formulario/formulario.html", {"form": form})
