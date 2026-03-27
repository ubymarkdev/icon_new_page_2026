function validacion_edad () {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log ("formulario enviado");
    
        let edad = document.getElementById("edad").value;
        let nombre = document.getElementById("nombre").value;
        edad = parseInt(edad);
        console.log(`Datos: ${nombre} , ${edad}` )
        if (edad >= 18) {
            alert ("edad valida")
            window.location.href = "/formulario";
        } else {
            alert("edad invalida")
        }
})

    }
 
validacion_edad()

const productos = ["iPad", "Iphone 14", "iPhone 14 Pro", "iphone 14 Pro Max"];
const precios_productos = [7000, 8000, 9500, 11000];
console.table (productos);
console.table (precios_productos);
console.log(productos[2]);
productos.forEach(function (producto){
    console.log(producto);
})

let contador = 0;
const carrito = [];
const boton = document.getElementById("click_agregar");

boton.addEventListener ("click", function(){
    contador++;
    console.log(contador)
; });

const click_imagen = document.getElementById("imagen_prueba");

click_imagen.addEventListener ("mouseover", function () {
    alert ("estas entrando al icono");
    console.log ("Pasada de mouse")
})
