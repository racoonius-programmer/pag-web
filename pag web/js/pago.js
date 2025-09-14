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

    limpiarCarrito();

    alert(`✅ Pago realizado con éxito.\nGanaste ${puntosGanados} puntos.\nAhora tienes un total de ${puntosActuales} puntos Level Up.`);
    window.location.href = "productos.html";
}
