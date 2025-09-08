document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("pwd").value;

        // Obtener usuarios dinámicos desde localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const todosUsuarios = [...userDB, ...usuariosGuardados];

        // Buscar usuario
        const usuario = todosUsuarios.find(u => u.correo === email && u.contrasena === password);

        if (!usuario) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        // Guardar sesión
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        // Redirigir según rol
        if (usuario.rol === "admin") {
            alert("Bienvenido administrador " + usuario.username + "!");
            window.location.href = "admin_main.html";
        } else {
            alert("Inicio de sesión exitoso. ¡Hola, " + usuario.username + "!");
            window.location.href = "main.html";
        }
    });
});
