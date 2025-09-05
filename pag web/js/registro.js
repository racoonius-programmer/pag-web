// registro.js

document.addEventListener("DOMContentLoaded", () => {
    // Establecer fecha máxima para fecha de nacimiento (hoy)
    const fechaInput = document.getElementById("fecha");
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    fechaInput.max = `${yyyy}-${mm}-${dd}`;

    // Obtener el formulario
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita envío por defecto

        // Obtener valores del formulario
        const username = document.getElementById("username").value.trim();
        const fecha = fechaInput.value;
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmar_contrasena").value;

        // Validaciones
        if (username.length < 3) {
            alert("El nombre de usuario debe tener al menos 3 caracteres.");
            return;
        }

        if (!fecha) {
            alert("Debes ingresar tu fecha de nacimiento.");
            return;
        }

        // Verificar que tenga al menos 18 años
        const fechaNacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        if (edad < 18) {
            alert("Debes ser mayor de 18 años para registrarte.");
            return;
        }

        if (!correo.includes("@")) {
            alert("Debes ingresar un correo válido.");
            return;
        }

        if (contrasena.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Aplicar descuento Duoc si corresponde
        let descuentoDuoc = false;
        if (correo.toLowerCase().includes("@duocuc.cl")) {
            descuentoDuoc = true; // 20% de descuento de por vida
        }

        // Crear objeto usuario
        const usuario = {
            username,
            fechaNacimiento: fecha,
            correo,
            contrasena,
            descuentoDuoc
        };

        // Guardar en localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuariosGuardados.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        // Guardar usuario actual
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        alert("Registro exitoso" + (descuentoDuoc ? " ¡Tienes 20% de descuento de por vida!" : ""));

        // Redirigir al main
        window.location.href = "main.html";
    });
});
