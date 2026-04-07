from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    imagen_slider = models.ImageField(upload_to="categorias/slider/")
    orden = models.PositiveIntegerField(default=0)
    activa = models.BooleanField(default=True)
    descripcion_categoria = models.CharField(max_length=150, default="Sin descripción")

    class Meta:
        ordering = ["orden", "nombre"]

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,
        related_name="productos"
    )
    nombre = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    imagen = models.ImageField(upload_to="productos/")
    descripcion = models.TextField(blank=True)
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    oferta = models.BooleanField(default=False)

    class Meta:
        ordering = ["orden", "nombre"]
        unique_together = ("categoria", "nombre")

    def __str__(self):
        return f"{self.categoria.nombre} | {self.nombre}"


class ProductoFoto(models.Model):
    producto = models.ForeignKey(
        Producto,
        on_delete=models.CASCADE,
        related_name="fotos"
    )
    imagen = models.ImageField(upload_to="productos/galeria/")
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["orden", "id"]

    def __str__(self):
        return f"Foto {self.orden} - {self.producto.nombre}"
