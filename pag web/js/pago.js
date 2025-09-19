//JS PARA CALCULAR LOS PUNTOS Y LLAMAR AL CARRITO LOCAL
function mostrarResumenPago() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("resumenPago");

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío, no puedes pagar.</p>";
        return;
    }

    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    // Calcular puntos
    const puntos = Math.floor(total / 100); // 100 pesos = 1 punto
    const valorPuntos = puntos * 10; // cada punto = $10 (equivalente al 10%)

    contenedor.innerHTML = `
        <h3>Resumen de Compra</h3>
        <p><strong>Total:</strong> $${total.toLocaleString('es-ES')}</p>
        <p><strong>Puntos a ganar:</strong> ${puntos} puntos (equivalen a $${valorPuntos.toLocaleString('es-ES')})</p>
    `;
}

function procesarPago() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    carrito.forEach(item => total += item.precio * item.cantidad);

    const puntosGanados = Math.floor(total / 100);

    // Obtener puntos actuales
    let puntosActuales = parseInt(localStorage.getItem("puntosLevelUp")) || 0;

    // Sumar puntos
    puntosActuales += puntosGanados;
    localStorage.setItem("puntosLevelUp", puntosActuales);

    // Vaciar carrito
    limpiarCarrito();

    alert(`✅ Pago realizado con éxito.\nGanaste ${puntosGanados} puntos.\nAhora tienes un total de ${puntosActuales} puntos Level Up.`);
    window.location.href = "productos.html"; // redirige de nuevo a productos
}

mostrarResumenPago();
function procesarPago() {

     // Obtener los datos del usuario activo desde el localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // Obtener el nombre de usuario y la dirección, si el usuario está activo
    const nombreUsuario = usuarioActivo ? usuarioActivo.username : "Usuario";
    const direccionUsuario = usuarioActivo ? usuarioActivo.direccion : "Dirección no disponible";

    // Generar un código de envío aleatorio de 6 dígitos
    const codigoEnvio = Math.floor(100000 + Math.random() * 900000);

    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    carrito.forEach(item => total += item.precio * item.cantidad);

    const puntosGanados = Math.floor(total / 100);

    let puntosActuales = parseInt(localStorage.getItem("puntosLevelUp")) || 0;
    puntosActuales += puntosGanados;
    localStorage.setItem("puntosLevelUp", puntosActuales);


    // Mensaje de alerta personalizado con los datos del usuario
    alert(`✅ ¡Pago realizado con éxito, ${nombreUsuario}!\n` +
          `Tu pedido será enviado a la dirección: ${direccionUsuario}.\n` +
          `Código de envío: #${codigoEnvio}.\n\n` +
          `Ganaste ${puntosGanados} puntos.\n` +
          `Ahora tienes un total de ${puntosActuales} puntos Level Up.`);

    // Limpiar carrito y redirigir
    limpiarCarrito();
    window.location.href = "productos.html";
}
