//JS PARA GUARDAR Y LLAMAR AL CARRITO COMO VARIABLE LOCAL
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto, cantidad = 1) {
    let carrito = obtenerCarrito();

    // Buscar si el producto ya existe en el carrito para sumarlo
    const existente = carrito.find(item => item.codigo === producto.codigo);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            ...producto,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    console.log("Carrito actualizado:", carrito);
    alert(`¡${cantidad} unidad(es) de ${producto.nombre} añadidas al carrito!`);
}

function eliminarDelCarrito(codigo, cantidad = null) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.codigo === codigo);

    if (index !== -1) {
        if (cantidad === null || cantidad >= carrito[index].cantidad) {
            // Si no se especifica cantidad o se pide más de lo que hay se borra todo
            carrito.splice(index, 1);
        } else {
            // Se borra la cantidad exacta si no
            carrito[index].cantidad -= cantidad;
        }
        guardarCarrito(carrito);
    }
}


function limpiarCarrito() {
    localStorage.removeItem("carrito");
}

