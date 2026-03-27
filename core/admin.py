from django.contrib import admin
from .models import Slide_home
from .models import Slide_clientes

# Register your models here.

@admin.register(Slide_home)
class slide_home_admin (admin.ModelAdmin):
    list_display = ("title", "subtitle", "image", 
                    "image_alt", "cta_text", "cta_url", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("title",)

@admin.register(Slide_clientes)
class slide_clientes_admin (admin.ModelAdmin):
    list_display = ("title", "image", "image_alt", "is_active", "order")
    list_editable = ("is_active", "order")
    search_fields = ("title",)

