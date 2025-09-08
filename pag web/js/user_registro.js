document.addEventListener("DOMContentLoaded", () => {
    const fechaInput = document.getElementById("fecha");
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    fechaInput.max = `${yyyy}-${mm}-${dd}`;

    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const fecha = fechaInput.value;
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmar_contrasena").value;

        // Validaciones
        if (username.length < 3) return alert("El nombre de usuario debe tener al menos 3 caracteres.");
        if (!fecha) return alert("Debes ingresar tu fecha de nacimiento.");

        let edad = hoy.getFullYear() - new Date(fecha).getFullYear();
        const mes = hoy.getMonth() - new Date(fecha).getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < new Date(fecha).getDate())) edad--;
        if (edad < 18) return alert("Debes ser mayor de 18 años para registrarte.");
        if (!correo.includes("@")) return alert("Debes ingresar un correo válido.");
        if (contrasena.length < 6) return alert("La contraseña debe tener al menos 6 caracteres.");
        if (contrasena !== confirmarContrasena) return alert("Las contraseñas no coinciden.");

        const descuentoDuoc = correo.toLowerCase().includes("@duocuc.cl");

        const nuevoUsuario = {
            username,
            fechaNacimiento: fecha,
            correo,
            contrasena,
            rol: "usuario",
            descuentoDuoc,
            fotoPerfil: ""
        };

        // Guardar usuarios en localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        // Guardar usuario actual
        localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

        alert("Registro exitoso" + (descuentoDuoc ? " ¡Tienes 20% de descuento de por vida!" : ""));
        window.location.href = "main.html";
    });
});
