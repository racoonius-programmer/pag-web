//Esto maneja todo lo relacionado con validaciones de formularios de usuarios
document.addEventListener("DOMContentLoaded", () => {
    //Variables temporales para validaciones de fechas
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');

//--------------------
// Esto es para user_registro.html
//--------------------
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioActual"));
    const registroForm = document.getElementById("registroForm");
    let regionSelect, comunaSelect; 

    if (registroForm) {
        const fechaInput = document.getElementById("fecha");
        if (fechaInput) {
        // Establece el máximo para el calendario
        fechaInput.max = `${yyyy}-${mm}-${dd}`;

        // Valida mientras el usuario escribe o cambia la fecha
        fechaInput.addEventListener("input", () => {
            const valor = fechaInput.value;
            if (!valor) return;

            const fechaSeleccionada = new Date(valor);
            if (fechaSeleccionada > hoy) {
            fechaInput.value = ""; // limpia el campo si mete una futura
            alert("No puedes ingresar una fecha futura.");
            }
        });
        }

        // Cargar regiones y comunas desde archivo local
        async function cargarRegiones() {
            try {
                const res = await fetch("json/comunas-regiones.json");
                const data = await res.json();

                const regiones = data.regiones;
                regionSelect = document.getElementById("elegirRegion");
                comunaSelect = document.getElementById("elegirComuna");

                // Poblar regiones
                regionSelect.innerHTML = `<option value="">Seleccione una región</option>`;
                regiones.forEach(r => {
                    regionSelect.innerHTML += `<option value="${r.region}">${r.region}</option>`;
                });

                // Evento: al cambiar la región
                regionSelect.addEventListener("change", () => {
                    const regionSeleccionada = regionSelect.value;
                    comunaSelect.innerHTML = `<option value="">Seleccione una comuna</option>`;
                    comunaSelect.disabled = true;

                    if (regionSeleccionada !== "") {
                        const regionData = regiones.find(r => r.region === regionSeleccionada);
                        regionData.comunas.forEach(comuna => {
                            comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
                        });
                        comunaSelect.disabled = false;
                    }
                });

            } catch (error) {
                console.error("Error cargando comunas-regiones:", error);
            }
        }

//TODAS LAS VALIDACIONES VISUALES AQUI

        //Para el correo
        const correoInput = document.getElementById("correo");
        const avisoCorreo = document.getElementById("aviso-correo");

        if (correoInput) {
        correoInput.addEventListener("input", () => {
            const correo = correoInput.value.trim();
            // Expresión regular simple para validar correo
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (correo === "") {
            avisoCorreo.textContent = "";
            return;
            }

            if (regexCorreo.test(correo)) {
            avisoCorreo.textContent = "✔ Correo válido";
            avisoCorreo.className = "mt-1 small text-success";
            } else {
            avisoCorreo.textContent = "✖ Ingresa un correo válido";
            avisoCorreo.className = "mt-1 small text-danger";
            }
        });
        }


        //Para mostrar aviso en tiempo real si las contraseñas coinciden
        const contrasenaInput = document.getElementById("contrasena");
        const confirmarInput = document.getElementById("confirmar_contrasena");
        const avisoContrasena = document.getElementById("aviso-contrasena");
        const avisoLargo = document.getElementById("aviso-largo");

        if (contrasenaInput && confirmarInput) {
        function validarContrasena() {
            // Validar longitud mínima
            if (contrasenaInput.value.length < 6) {
            avisoLargo.textContent = "✖ La contraseña debe tener al menos 6 caracteres";
            avisoLargo.className = "mt-1 small text-danger";
            } else {
            avisoLargo.textContent = "✔ Longitud de contraseña válida";
            avisoLargo.className = "mt-1 small text-success";
            }

            // Validar coincidencia solo si hay algo en confirmar
            if (confirmarInput.value === "") {
            avisoContrasena.textContent = "";
            return;
            }

            if (contrasenaInput.value === confirmarInput.value) {
            avisoContrasena.textContent = "✔ Las contraseñas coinciden";
            avisoContrasena.className = "mt-1 small text-success";
            } else {
            avisoContrasena.textContent = "✖ Las contraseñas no coinciden";
            avisoContrasena.className = "mt-1 small text-danger";
            }
        }

        contrasenaInput.addEventListener("input", validarContrasena);
        confirmarInput.addEventListener("input", validarContrasena);
        }

        //Para validar nombre de usuario
        const usernameInput = document.getElementById("username");
        const avisoUsername = document.getElementById("aviso-username");

        if (usernameInput) {
        usernameInput.addEventListener("input", () => {
            const valor = usernameInput.value.trim();

            if (valor === "") {
            avisoUsername.textContent = "";
            return;
            }

            if (valor.length >= 3) {
            avisoUsername.textContent = "✔ Nombre de usuario válido";
            avisoUsername.className = "mt-1 small text-success";
            } else {
            avisoUsername.textContent = "✖ El nombre de usuario debe tener al menos 3 caracteres";
            avisoUsername.className = "mt-1 small text-danger";
            }
        });
        }

        //Para validar la longitud del numero
        const telefonoInput = document.getElementById("telefono");
        const avisoTelefono = document.getElementById("aviso-telefono");

        telefonoInput.addEventListener("input", () => {
            let valor = telefonoInput.value.replace(/\D/g, ""); // solo números

            // Limitar a 9 dígitos
            valor = valor.substring(0, 9);

            // Formato visual: "9 1234 5678"
            let formatted = "";
            if (valor.length > 0) formatted += valor.charAt(0);
            if (valor.length > 1) formatted += " " + valor.substring(1, 5);
            if (valor.length > 5) formatted += " " + valor.substring(5, 9);

            telefonoInput.value = formatted;

            // Mensaje en tiempo real
            if (valor.length === 9) {
                avisoTelefono.textContent = "✔ Número válido";
                avisoTelefono.className = "mt-1 small text-success";
            } else if (valor.length > 0) {
                avisoTelefono.textContent = "✖ Número incompleto";
                avisoTelefono.className = "mt-1 small text-danger";
            } else {
                avisoTelefono.textContent = ""; // si está vacío, no mostrar nada
            }
        });

//FIN VALIDACIONES VISUALES

        // Llamar a la función de regiones al cargar la página
        cargarRegiones();

        // Registro
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
            const region = regionSelect.value;
            const comuna = comunaSelect.value;

            // Validaciones
            if (username.length < 3) return alert("El nombre de usuario debe tener al menos 3 caracteres.");
            if (!fecha) return alert("Debes ingresar tu fecha de nacimiento.");
            let edad = hoy.getFullYear() - new Date(fecha).getFullYear();
            const mes = hoy.getMonth() - new Date(fecha).getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < new Date(fecha).getDate())) edad--;
            if (edad < 18) return alert("Debes ser mayor de 18 años para registrarte.");
            if (!correo.includes("@") || !correo.includes(".")) return alert("Debes ingresar un correo válido.");  
            if (contrasena.length < 6) return alert("La contraseña debe tener al menos 6 caracteres.");
            if (contrasena !== confirmarContrasena) return alert("Las contraseñas no coinciden.");
            if (direccion.length < 5) return alert("La dirección debe tener al menos 5 caracteres.");
            if (!region) return alert("Debes seleccionar una región.");
            if (!comuna) return alert("Debes seleccionar una comuna.");

            const descuentoDuoc = correo.toLowerCase().includes("@duocuc.cl");

            // Ver usuarios existentes
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Generar id incremental
            const siguienteId = usuariosGuardados.length > 0
                ? Math.max(...usuariosGuardados.map(u => u.id || 0)) + 1
                : 1;

            // Nuevo usuario
            const nuevoUsuario = {
                id: siguienteId,
                username,
                correo,
                fechaNacimiento: fecha,
                contrasena,
                telefono,
                direccion,
                region,  // 👈 ahora se guarda como string (ej: "Región Metropolitana")
                comuna,  // 👈 string (ej: "Puente Alto")
                rol: "usuario",
                descuentoDuoc,
                fotoPerfil: "img/header/user-logo-generic-white-alt.png"
            };

            // Guardar
            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
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


// Para alternar contraseñas con ojo
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = document.getElementById(icon.dataset.target);
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");
        } else {
            input.type = "password";
            icon.classList.remove("bi-eye-slash-fill");
            icon.classList.add("bi-eye-fill");
        }
    });
});
