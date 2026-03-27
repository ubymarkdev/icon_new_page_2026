from django.shortcuts import render

# Create your views here.

def pagina_blog (request):
   return render(request,"blog/blog.html")