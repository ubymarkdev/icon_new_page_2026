from django.db import models

# Create your models here.

class Slide_home(models.Model):
    title = models.CharField(max_length=70, blank=True)
    subtitle = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="slider_img_home/")
    image_alt = models.CharField (max_length=150, blank=True)
    cta_text = models.CharField(max_length=100, blank=True)
    cta_url = models.CharField(max_length=40, default=True)
    order = models.PositiveBigIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title or f"Slide {self.pk}"
    

class Slide_clientes(models.Model):
    image = models.ImageField(upload_to="slider_clientes_home/")
    image_alt = models.CharField(max_length=150, blank=True)
    title = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveBigIntegerField(default=0)

    class Meta: 
        ordering = ["order"]

    def __str__(self):
        return self.title or f"slide {self.pk}"