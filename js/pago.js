// JS PARA CALCULAR LOS PUNTOS Y LLAMAR AL CARRITO LOCAL

// NOTA: Se asume que la función 'mostrarModal' (versión JS nativo) está disponible 
// globalmente (ej: en form_validaciones.js) y que 'obtenerCarrito' y 'limpiarCarrito' existen.

// La función 'mostrarModal' (JS nativo) debe estar disponible para que este script funcione.
// Ejemplo de cómo luce (si aún usas jQuery, cámbiala a la versión nativa):
/*
let modalHiddenHandler = null; 
function mostrarModal(mensaje, titulo = "Mensaje", callback = null) {
    // ... (implementación de mostrarModal con bootstrap.Modal y addEventListener)
}
*/

function mostrarResumenPago() {
    // Obtiene el carrito desde localStorage.
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("resumenPago");

    // Si está vacío → muestra un mensaje.
    if (!contenedor) return; // Validación extra
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío, no puedes pagar. </p><a href='productos.html' class='btn btn-primary'>Ir a Productos</a>";
        return;
    }

    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    // Calcula el total y los puntos que ganará el usuario:
    // Regla: $100 = 1 punto, cada punto vale $10.
    const puntos = Math.floor(total / 100); // 100 pesos = 1 punto
    const valorPuntos = puntos * 10; // cada punto = $10 (equivalente al 10%)

    contenedor.innerHTML = `
        <h3>Resumen de Compra</h3>
        <p><strong>Total a Pagar:</strong> $${total.toLocaleString('es-ES')}</p>
        <p><strong>Puntos a ganar:</strong> ${puntos} puntos (equivalen a $${valorPuntos.toLocaleString('es-ES')})</p>
    `;
}

function procesarPago() {
    
    // Obtener los datos del usuario activo desde el localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // Validar si hay un usuario activo para obtener datos
    if (!usuarioActivo) {
        // Usamos el modal para alertar y redirigir al inicio de sesión
        return mostrarModal(
            "Debes iniciar sesión para completar tu compra.", 
            "Error de Pago", 
            () => { window.location.href = "user_inicio_sesion.html"; }
        );
    }
    
    const nombreUsuario = usuarioActivo.username;
    const direccionUsuario = usuarioActivo.direccion || "Dirección no registrada. Por favor, actualiza tu perfil.";

    // Generar un código de envío aleatorio de 6 dígitos
    const codigoEnvio = Math.floor(100000 + Math.random() * 900000);

    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        // Reemplazo del alert
        mostrarModal("Tu carrito está vacío.", "Error de Pago");
        return;
    }

    let total = 0;
    carrito.forEach(item => total += item.precio * item.cantidad);

    const puntosGanados = Math.floor(total / 100);

    // ** Suma los puntos ganados al total acumulado en localStorage. ** let puntosActuales = parseInt(localStorage.getItem("puntosLevelUp")) || 0;
    puntosActuales += puntosGanados;
    localStorage.setItem("puntosLevelUp", puntosActuales);

    // Vaciar carrito
    limpiarCarrito();

    // Mensaje final personalizado
    const mensajeFinal = 
        `✅ ¡Pago realizado con éxito, ${nombreUsuario}!\n` +
        `Tu pedido será enviado a la dirección: ${direccionUsuario}.\n` +
        `Código de envío: #${codigoEnvio}.\n\n` +
        `Ganaste ${puntosGanados} puntos.\n` +
        `Ahora tienes un total de ${puntosActuales} puntos Level Up.`;

    // Reemplazo del alert y redirección
    mostrarModal(mensajeFinal, "¡Compra Exitosa!", () => {
        window.location.href = "productos.html"; // redirige de nuevo a productos después de cerrar el modal
    });
}

// Llama a la función al cargar la página.
document.addEventListener('DOMContentLoaded', mostrarResumenPago);