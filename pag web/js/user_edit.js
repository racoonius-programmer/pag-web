// user_edit.js

document.addEventListener("DOMContentLoaded", () => {
    // Cargar usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "user_inicio_sesion.html";
        return;
    }

    // Llenar formulario
    const usernameInput = document.getElementById("username");
    const correoInput = document.getElementById("correo");
    const fechaInput = document.getElementById("fechaNacimiento");
    const telefonoInput = document.getElementById("telefono");
    const direccionInput = document.getElementById("direccion");
    const fotoUrlInput = document.getElementById("fotoUrl");
    const regionSelect = document.getElementById("elegirRegion");
    const fotoPerfilImg = document.getElementById("fotoPerfil");

    usernameInput.value = usuario.username || "";
    correoInput.value = usuario.correo || "";
    fechaInput.value = usuario.fechaNacimiento || "";
    telefonoInput.value = usuario.telefono || "";
    direccionInput.value = usuario.direccion || "";
    fotoUrlInput.value = usuario.fotoPerfil || "";
    regionSelect.value = usuario.region || "Metropolitana de Santiago";

    if (usuario.fotoPerfil) {
        fotoPerfilImg.src = usuario.fotoPerfil;
    }

    // Actualizar variable temporal y foto en tiempo real
    usernameInput.addEventListener("input", (e) => { usuario.username = e.target.value; });
    telefonoInput.addEventListener("input", (e) => { usuario.telefono = e.target.value; });
    direccionInput.addEventListener("input", (e) => { usuario.direccion = e.target.value; });
    fotoUrlInput.addEventListener("input", (e) => {
        usuario.fotoPerfil = e.target.value;
        fotoPerfilImg.src = e.target.value || "img/header/user-logo-generic-white-alt.png";
    });
    regionSelect.addEventListener("change", (e) => { usuario.region = e.target.value; });

    // Guardar cambios en localStorage
    document.getElementById("guardarCambios").addEventListener("click", () => {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert("Cambios guardados correctamente.");
    });
});
