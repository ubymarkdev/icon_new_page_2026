from django.contrib import admin
from .models import Categoria, Producto, ProductoFoto


class ProductoFotoInline(admin.TabularInline):
    model = ProductoFoto
    extra = 1
    fields = ("imagen", "orden")
    ordering = ("orden", "id")


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "orden", "activa")
    list_editable = ("orden", "activa")
    search_fields = ("nombre",)
    prepopulated_fields = {"slug": ("nombre",)}


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "categoria", "oferta", "orden", "activo")
    list_filter = ("categoria", "oferta", "activo")
    list_editable = ("oferta", "orden", "activo")
    search_fields = ("nombre",)
    prepopulated_fields = {"slug": ("nombre",)}
    inlines = [ProductoFotoInline]
    fieldsets = (
        ("Datos base", {"fields": ("categoria", "nombre", "slug", "imagen")}),
        ("Contenido", {"fields": ("descripcion",)}),
        ("Estado", {"fields": ("oferta", "activo", "orden")}),
    )
