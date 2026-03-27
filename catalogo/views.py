from django.shortcuts import get_object_or_404, render
from .models import Categoria, Producto


def pagina_catalogo(request):
    categorias = Categoria.objects.filter(activa=True).order_by("orden", "nombre")
    productos = Producto.objects.filter(activo=True).select_related("categoria").order_by("orden", "nombre")

    return render(request, "catalogo/catalogo.html", {
        "categorias": categorias,
        "productos": productos,
    })


def producto_detalle(request, slug):
    producto = get_object_or_404(
        Producto.objects.select_related("categoria").prefetch_related("fotos"),
        slug=slug,
        activo=True,
    )
    return render(request, "catalogo/producto_detalle.html", {
        "producto": producto,
    })
