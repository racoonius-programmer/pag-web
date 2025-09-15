//Esto maneja todo lo relacionado con validaciones de formularios de usuarios
document.addEventListener("DOMContentLoaded", () => {
    //Variables temporales para validaciones de fechas
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');

//--------------------
//Esto es para user_registro.html
//--------------------
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioActual"));
    const registroForm = document.getElementById("registroForm");
    if (registroForm) {
        const fechaInput = document.getElementById("fecha");
        if (fechaInput) {
            fechaInput.max = `${yyyy}-${mm}-${dd}`;
        }

        registroForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Valores del formulario
            const username = document.getElementById("username").value.trim();
            const fecha = fechaInput ? fechaInput.value : "";
            const correo = document.getElementById("correo").value.trim();
            const contrasena = document.getElementById("contrasena").value;
            const confirmarContrasena = document.getElementById("confirmar_contrasena").value;
            const telefono = document.getElementById("telefono").value.trim();
            const direccion = document.getElementById("Direccion").value.trim();
            const region = document.getElementById("elegirRegion").value;

            // Validaciones
            if (username.length < 3) return alert("El nombre de usuario debe tener al menos 3 caracteres.");
            if (!fecha) return alert("Debes ingresar tu fecha de nacimiento.");
            //Para verificar si es mayor de edad
            let edad = hoy.getFullYear() - new Date(fecha).getFullYear();
            const mes = hoy.getMonth() - new Date(fecha).getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < new Date(fecha).getDate())) edad--;
            if (edad < 18) return alert("Debes ser mayor de 18 años para registrarte.");
            if (!correo.includes("@") || !correo.includes(".")) return alert("Debes ingresar un correo válido.");  
            if (contrasena.length < 6) return alert("La contraseña debe tener al menos 6 caracteres.");
            if (contrasena !== confirmarContrasena) return alert("Las contraseñas no coinciden.");
            if (direccion.length < 5) return alert("La dirección debe tener al menos 5 caracteres.");

            const descuentoDuoc = correo.toLowerCase().includes("@duocuc.cl");

            // Ver usuarios existentes
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Generar id incremental al registrar otro usuario
            const siguienteId = usuariosGuardados.length > 0
                ? Math.max(...usuariosGuardados.map(u => u.id || 0)) + 1
                : 1;

            //Variables del nuevo usuario
            const nuevoUsuario = {
                id: siguienteId,
                username,
                correo,
                fechaNacimiento: fecha,
                contrasena,
                telefono,
                direccion,
                region: parseInt(region),
                rol: "usuario",
                descuentoDuoc,
                fotoPerfil: "img/header/user-logo-generic-white-alt.png"
            };

            // Guardar usuarios en localStorage
            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

            // Guardar sesión
            localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

            alert("Registro exitoso" + (descuentoDuoc ? " ¡Tienes 20% de descuento de por vida!" : ""));
            window.location.href = "main.html";
        });
    }


//--------------------
//Esto es para user_inicio_sesion.html
//--------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("pwd").value;

            // Usuarios en localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.correo === email && u.contrasena === password);

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
    }
});


//--------------------
//Esto es para user_perfil.html
//--------------------
const perfilForm = document.getElementById("perfilForm");
if (perfilForm) {
    document.addEventListener("DOMContentLoaded", () => {
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        if (!usuario) {
            alert("Debes iniciar sesión primero.");
            window.location.href = "user_inicio_sesion.html";
            return;
        }

        // Referencias
        const usernameInput = document.getElementById("username");
        const correoInput = document.getElementById("correo");
        const fechaInput = document.getElementById("fechaNacimiento");
        const telefonoInput = document.getElementById("telefono");
        const direccionInput = document.getElementById("direccion");
        const fotoUrlInput = document.getElementById("fotoUrl");
        const regionSelect = document.getElementById("region");
        const fotoPerfilImg = document.getElementById("fotoPerfil");

        // Cargar datos
        usernameInput.value = usuario.username || "";
        correoInput.value = usuario.correo || "";
        fechaInput.value = usuario.fechaNacimiento || "";
        telefonoInput.value = usuario.telefono || "";
        direccionInput.value = usuario.direccion || "";
        fotoUrlInput.value = usuario.fotoPerfil || "";
        regionSelect.value = String(usuario.region || "1"); // 👈 convierte a string

        if (usuario.fotoPerfil) {
            fotoPerfilImg.src = usuario.fotoPerfil;
        }

// Guardar cambios
document.getElementById("guardarCambios").addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const direccion = direccionInput.value.trim();
    const fotoUrl = fotoUrlInput.value.trim();
    const region = parseInt(regionSelect.value);

    // Validaciones
    if (username.length < 3) return alert("El nombre de usuario debe tener al menos 3 caracteres.");
    if (telefono && !/^[0-9]{8,15}$/.test(telefono)) return alert("El teléfono debe contener solo números (8 a 15 dígitos).");
    if (direccion.length < 5) return alert("La dirección debe tener al menos 5 caracteres.");

    // Actualizar usuario actual
    usuario.username = username;
    usuario.telefono = telefono;
    usuario.direccion = direccion;
    usuario.fotoPerfil = fotoUrl || "img/header/user-logo-generic-white-alt.png";
    usuario.region = region;

    // Guardar usuario actual
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));//todo lo tiramos a localstorage

    // Actualizar la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || userDB;
    const index = usuarios.findIndex(u => u.id === usuario.id);
    
    if (index !== -1) {
        usuarios[index] = usuario; // reemplaza el usuario existente
    } else {
        usuarios.push(usuario); // si no existe, lo agrega
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cambios guardados correctamente.");
    location.reload();
});

    });
}
