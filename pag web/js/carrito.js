//JS PARA GUARDAR Y LLAMAR AL CARRITO COMO VARIABLE LOCAL
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];

    /* 
    Busca en localStorage el carrito guardado.
    Si no existe → devuelve un arreglo vacío.
    Siempre devuelve el carrito como un array de productos.
    Esto asegura que siempre haya un carrito válido, aunque sea vacío.
    */
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    /* 
    Convierte el carrito en JSON y lo guarda en localStorage.
    Mantiene la persistencia (aunque se cierre o recargue la página, el carrito sigue ahí)
    */
}

function agregarAlCarrito(producto, cantidad = 1) {
    //Primero trae el carrito actual.
    let carrito = obtenerCarrito();

    // Buscar si el producto ya existe en el carrito para sumarlo
    const existente = carrito.find(item => item.codigo === producto.codigo);

    // Si existe → aumenta la cantidad.
    // Si no existe → lo agrega como nuevo.
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    // Luego guarda el carrito en localStorage.
    guardarCarrito(carrito);

    // Muestra un alert y log en consola para confirmar.
    console.log("Carrito actualizado:", carrito);
    alert(`¡${cantidad} unidad(es) de ${producto.nombre} añadidas al carrito!`);

    /* 
    Permite acumular cantidades del mismo producto en vez de duplicarlo.
    */
}

function eliminarDelCarrito(codigo, cantidad = null) {
    let carrito = obtenerCarrito();

    // Busca el producto por código.
    const index = carrito.findIndex(item => item.codigo === codigo);

    if (index !== -1) {
        if (cantidad === null || cantidad >= carrito[index].cantidad) {
            // Si no se especifica cantidad o se pide más de lo que hay se borra todo
            carrito.splice(index, 1);
        } else {
            // Se borra la cantidad exacta si no
            carrito[index].cantidad -= cantidad;
        }
        // Siempre guarda el carrito actualizado.
        guardarCarrito(carrito);
    }

    // Permite eliminar todo el producto o solo parte.
}


function limpiarCarrito() {
    localStorage.removeItem("carrito");
    /*
    Borra el carrito completo del localStorage.
    Se usa, por ejemplo, después de finalizar una compra.
👉 Deja el carrito limpio para empezar otra compra
*/
}

