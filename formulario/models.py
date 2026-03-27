from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class lead(models.Model):

    CANALES = [("transformador", "Transformador"),
                ("marmolero", "Marmolero"),
                ("carpintero", "Carpintero"),
                ("mueblero", "Mueblero"),
                ("cocinista", "Cocinista"),
                ("constructora", "Constructora"),
                ("distribuidor", "Distribuidor"),
                ("inmobiliaria", "Inmobiliaria"),
                ("arquitecto", "Arquitecto"),
                ("ingeniero", "Ingeniero"),
                ("cliente_particular", "Cliente particular"),
                ]

    nombre = models.CharField(max_length=100)
    telefono = PhoneNumberField()
    requerimiento = models.CharField(max_length=200)
    empresa = models.CharField(max_length=100)
    canal = models.CharField(max_length=20, choices=CANALES)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return self.nombre



 
