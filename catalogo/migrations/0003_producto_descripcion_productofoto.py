from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0002_producto_oferta'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descripcion',
            field=models.TextField(blank=True),
        ),
        migrations.CreateModel(
            name='ProductoFoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='productos/galeria/')),
                ('orden', models.PositiveIntegerField(default=0)),
                ('producto', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='fotos', to='catalogo.producto')),
            ],
            options={
                'ordering': ['orden', 'id'],
            },
        ),
    ]
