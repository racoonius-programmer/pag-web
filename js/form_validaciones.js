// Esto maneja todo lo relacionado con validaciones de formularios de usuarios
document.addEventListener("DOMContentLoaded", () => {
    
    // Esta variable es necesaria para poder eliminar el manejador de eventos anterior
    // y se define en el ámbito global del script para que persista.
    let modalHiddenHandler = null; 

    /**
     * Función para mostrar el modal de Bootstrap 5 usando JS nativo.
     * Reemplaza todos los alert().
     */
    function mostrarModal(mensaje, titulo = "Mensaje", callback = null) {
        const modalElement = document.getElementById('generalModal');
        if (!modalElement) {
            console.error("No se encontró el modal con ID 'generalModal'.");
            return;
        }

        // Inicializar el modal de Bootstrap
        const modal = new bootstrap.Modal(modalElement);
        document.getElementById('modalTitle').textContent = titulo;
        document.getElementById('modalBody').textContent = mensaje;
        
        // --- LÓGICA DE CALLBACK CON JS NATIVO ---
        if (callback && typeof callback === 'function') {
            
            // 1. Si existe un manejador anterior, lo removemos
            if (modalHiddenHandler) {
                modalElement.removeEventListener('hidden.bs.modal', modalHiddenHandler);
            }

            // 2. Definimos el nuevo manejador que ejecuta el callback (la redirección)
            modalHiddenHandler = function() {
                callback(); 
                
                // Limpieza: Remover el listener después de ejecutarlo
                modalElement.removeEventListener('hidden.bs.modal', modalHiddenHandler);
                modalHiddenHandler = null;
            };

            // 3. Agregamos el nuevo listener
            modalElement.addEventListener('hidden.bs.modal', modalHiddenHandler);
        }
        
        // 4. Mostrar el modal
        modal.show();
    }


    // Variables temporales para validaciones de fechas
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    
    //-------------------------------------------------------------------------------------------------------------------
    // VARIABLES Y FUNCIÓN DE REGIONES/COMUNAS (Accesibles Globalmente para Registro y Perfil)
    //-------------------------------------------------------------------------------------------------------------------
    
    let regionSelect, comunaSelect;

    async function cargarRegiones() {
        try {
            const res = await fetch("json/comunas-regiones.json");
            const data = await res.json();

            const regiones = data.regiones;
            regionSelect = document.getElementById("elegirRegion");
            comunaSelect = document.getElementById("elegirComuna");

            if (!regionSelect || !comunaSelect) return;

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
    
    cargarRegiones();

    //-------------------------------------------------------------------------------------------------------------------
    // user_registro.html
    //-------------------------------------------------------------------------------------------------------------------
    
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioActual"));
    const registroForm = document.getElementById("registroForm");

    if (registroForm) {
        const fechaInput = document.getElementById("fecha");
        const avisoFecha = document.getElementById("aviso-fecha");

        if (fechaInput) {
            fechaInput.max = `${yyyy}-${mm}-${dd}`;

            fechaInput.addEventListener("input", () => {
                const valor = fechaInput.value;
                if (!valor) {
                    avisoFecha.textContent = "";
                    return;
                }

                const fechaSeleccionada = new Date(valor);
                
                let edad = hoy.getFullYear() - fechaSeleccionada.getFullYear();
                const mes = hoy.getMonth() - fechaSeleccionada.getMonth();
                const dia = hoy.getDate() - fechaSeleccionada.getDate();

                if (mes < 0 || (mes === 0 && dia < 0)) {
                    edad--;
                }

                if (fechaSeleccionada > hoy) {
                    fechaInput.value = "";
                    avisoFecha.textContent = "✖ No puedes ingresar una fecha futura.";
                    avisoFecha.className = "mt-1 small text-danger";
                    mostrarModal("No puedes ingresar una fecha futura.", "Error de Fecha"); 
                } else if (edad < 18) {
                    avisoFecha.textContent = "✖ Debes ser mayor de 18 años.";
                    avisoFecha.className = "mt-1 small text-danger";
                } else if (edad > 100) {
                    avisoFecha.textContent = "✖ No puedes tener más de 100 años.";
                    avisoFecha.className = "mt-1 small text-danger";
                } else {
                    avisoFecha.textContent = "✔ Fecha válida.";
                    avisoFecha.className = "mt-1 small text-success";
                }
            });
        }
        
        // Resto de validaciones visuales (Correo, Contraseña, Username, Teléfono, Dirección)
        // ... (el código de las validaciones visuales se mantiene igual)

        const correoInput = document.getElementById("correo");
        const avisoCorreo = document.getElementById("aviso-correo");
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

        if (correoInput) {
            correoInput.addEventListener("input", () => {
                const correo = correoInput.value.trim();
                const esCorreoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

                if (correo === "") {
                    avisoCorreo.textContent = "";
                    return;
                }

                if (esCorreoValido) {
                    avisoCorreo.textContent = "✔ Correo válido";
                    avisoCorreo.className = "mt-1 small text-success";
                } else {
                    avisoCorreo.textContent = "✖ Ingresa un correo de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
                    avisoCorreo.className = "mt-1 small text-danger";
                }
            });
        }

        const contrasenaInput = document.getElementById("contrasena");
        const confirmarInput = document.getElementById("confirmar_contrasena");
        const avisoContrasena = document.getElementById("aviso-contrasena");
        const avisoLargo = document.getElementById("aviso-largo");

        if (contrasenaInput && confirmarInput) {
            function validarContrasena() {
                if (contrasenaInput.value.length < 4) {
                    avisoLargo.textContent = "✖ La contraseña debe tener al menos 4 caracteres";
                    avisoLargo.className = "mt-1 small text-danger";
                } else {
                    avisoLargo.textContent = "✔ Longitud de contraseña válida";
                    avisoLargo.className = "mt-1 small text-success";
                }

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

        const telefonoInput = document.getElementById("telefono");
        const avisoTelefono = document.getElementById("aviso-telefono");
        
        if (telefonoInput) {
            telefonoInput.addEventListener("input", () => {
                let valor = telefonoInput.value.replace(/\D/g, "");

                valor = valor.substring(0, 9);

                let formatted = "";
                if (valor.length > 0) formatted += valor.charAt(0);
                if (valor.length > 1) formatted += " " + valor.substring(1, 5);
                if (valor.length > 5) formatted += " " + valor.substring(5, 9);

                telefonoInput.value = formatted;

                if (valor.length === 9) {
                    avisoTelefono.textContent = "✔ Número válido";
                    avisoTelefono.className = "mt-1 small text-success";
                } else if (valor.length > 0) {
                    avisoTelefono.textContent = "✖ Número incompleto";
                    avisoTelefono.className = "mt-1 small text-danger";
                } else {
                    avisoTelefono.textContent = "";
                }
            });
        }

        const direccionInput = document.getElementById("Direccion");
        const avisoDireccion = document.getElementById("aviso-direccion");

        if(direccionInput) {
            direccionInput.addEventListener("input", () => {
                const valor = direccionInput.value.trim();
                
                if (valor === "") {
                    avisoDireccion.textContent = "";
                    return;
                }
                
                if (valor.length >= 5) {
                    avisoDireccion.textContent = "✔ Dirección válida";
                    avisoDireccion.className = "mt-1 small text-success";
                } else {
                    avisoDireccion.textContent = "✖ La dirección debe tener al menos 5 caracteres";
                    avisoDireccion.className = "mt-1 small text-danger";
                }
            });
        }

        // Registro (Manejador de submit)
        registroForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const fecha = fechaInput ? fechaInput.value : "";
            const correo = document.getElementById("correo").value.trim();
            const contrasena = document.getElementById("contrasena").value;
            const confirmarContrasena = document.getElementById("confirmar_contrasena").value;
            const telefono = document.getElementById("telefono").value.trim();
            const direccion = document.getElementById("Direccion").value.trim();
            const region = regionSelect ? regionSelect.value : "";
            const comuna = comunaSelect ? comunaSelect.value : "";
            const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const esCorreoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

            // Validaciones (REEMPLAZO de alerts)
            if (username.length < 3) return mostrarModal("El nombre de usuario debe tener al menos 3 caracteres.", "Error de Validación");
            if (!fecha) return mostrarModal("Debes ingresar tu fecha de nacimiento.", "Error de Validación");
            
            let edad = hoy.getFullYear() - new Date(fecha).getFullYear();
            const mes = hoy.getMonth() - new Date(fecha).getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < new Date(fecha).getDate())) edad--;
            
            if (edad < 18) return mostrarModal("Debes ser mayor de 18 años para registrarte.", "Error de Validación");
            if (edad > 100) return mostrarModal("No puedes tener más de 100 años.", "Error de Validación");
            if (!esCorreoValido) return mostrarModal("Debes ingresar un correo de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com.", "Error de Validación");
            if (contrasena.length < 4) return mostrarModal("La contraseña debe tener al menos 4 caracteres.", "Error de Validación");
            if (contrasena !== confirmarContrasena) return mostrarModal("Las contraseñas no coinciden.", "Error de Validación");
            if (direccion.length < 5) return mostrarModal("La dirección debe tener al menos 5 caracteres.", "Error de Validación");
            if (!region) return mostrarModal("Debes seleccionar una región.", "Error de Validación");
            if (!comuna) return mostrarModal("Debes seleccionar una comuna.", "Error de Validación");

            // Lógica de registro...
            const descuentoDuoc = correo.toLowerCase().includes("@duoc.cl") || correo.toLowerCase().includes("@profesor.duoc.cl");
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
            const siguienteId = usuariosGuardados.length > 0
                ? Math.max(...usuariosGuardados.map(u => u.id || 0)) + 1
                : 1;
            const telefonoSinFormato = telefono.replace(/\D/g, "");

            const nuevoUsuario = {
                id: siguienteId,
                username,
                correo,
                fechaNacimiento: fecha,
                contrasena,
                telefono: telefonoSinFormato,
                direccion,
                region,
                comuna,
                rol: "usuario",
                descuentoDuoc,
                fotoPerfil: "img/header/user-logo-generic-white-alt.png"
            };

            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
            
            if (usuarioLogueado && usuarioLogueado.rol === 'admin') {
                mostrarModal("Usuario registrado con éxito.", "Registro Exitoso", () => {
                    window.location.href = "admin_main.html";
                });
            } else {
                localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
                mostrarModal("Registro exitoso" + (descuentoDuoc ? " ¡Tienes 20% de descuento de por vida!" : ""), "Registro Exitoso", () => {
                    window.location.href = "main.html";
                });
            }
        });
    }

    //-------------------------------------------------------------------------------------------------------------------
    // user_inicio_sesion.html
    //-------------------------------------------------------------------------------------------------------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const emailInput = document.getElementById("email");
        const avisoEmail = document.getElementById("aviso-email");

        if (emailInput && avisoEmail) {
            emailInput.addEventListener("input", () => {
                const email = emailInput.value.trim();
                const esCorreoValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

                if (email === "") {
                    avisoEmail.textContent = "";
                    return;
                }
                if (esCorreoValido) {
                    avisoEmail.textContent = "✔ Correo válido";
                    avisoEmail.className = "mt-1 small text-success";
                } else {
                    avisoEmail.textContent = "✖ El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
                    avisoEmail.className = "mt-1 small text-danger";
                }
            });
        }
        
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("pwd").value;
            const esCorreoValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

            // Validaciones del formulario de inicio de sesión (REEMPLAZO de alerts)
            if (!esCorreoValido) {
                mostrarModal("El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com.", "Error de Inicio de Sesión");
                return;
            }

            if (password.length > 10) {
                 mostrarModal("La contraseña no puede tener más de 10 caracteres.", "Error de Inicio de Sesión");
                 return;
            }

            // Lógica de inicio de sesión...
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.correo === email && u.contrasena === password);

            if (!usuario) {
                mostrarModal("Correo o contraseña incorrectos.", "Error de Inicio de Sesión");
                return;
            }

            localStorage.setItem("usuarioActual", JSON.stringify(usuario));

            // Redirigir según rol (REEMPLAZO de alerts)
            if (usuario.rol === "admin") {
                mostrarModal("Bienvenido administrador " + usuario.username + "!", "Inicio de Sesión Exitoso", () => {
                    window.location.href = "admin_main.html";
                });
            } else {
                mostrarModal("Inicio de sesión exitoso. ¡Hola, " + usuario.username + "!", "Inicio de Sesión Exitoso", () => {
                    window.location.href = "main.html";
                });
            }
        });
    }

    //-------------------------------------------------------------------------------------------------------------------
    // user_perfil.html
    //-------------------------------------------------------------------------------------------------------------------
    const perfilForm = document.getElementById("perfilForm");
    if (perfilForm) {
        
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        if (!usuario) {
            mostrarModal("Debes iniciar sesión primero.", "Acceso Denegado", () => {
                window.location.href = "user_inicio_sesion.html";
            });
            return;
        }

        const usernameInput = document.getElementById("username");
        const correoInput = document.getElementById("correo");
        const fechaInput = document.getElementById("fecha"); 
        const telefonoInput = document.getElementById("telefono");
        const direccionInput = document.getElementById("Direccion"); 
        const fotoUrlInput = document.getElementById("fotoUrl");
        const fotoPerfilImg = document.getElementById("fotoPerfil");

        // Cargar datos
        usernameInput.value = usuario.username || "";
        correoInput.value = usuario.correo || "";
        fechaInput.value = usuario.fechaNacimiento || "";
        direccionInput.value = usuario.direccion || "";
        fotoUrlInput.value = usuario.fotoPerfil || "";
        
        if (usuario.telefono) {
            let valor = usuario.telefono.replace(/\D/g, "");
            let formatted = "";
            if (valor.length > 0) formatted += valor.charAt(0);
            if (valor.length > 1) formatted += " " + valor.substring(1, 5);
            if (valor.length > 5) formatted += " " + valor.substring(5, 9);
            telefonoInput.value = formatted;
        } else {
            telefonoInput.value = "";
        }
        
        if (usuario.fotoPerfil) {
            fotoPerfilImg.src = usuario.fotoPerfil;
        }
        
        // Lógica ASÍNCRONA para cargar Región y Comuna guardada
        const intervalId = setInterval(() => {
            if (typeof regionSelect !== 'undefined' && regionSelect && regionSelect.options.length > 1) {
                clearInterval(intervalId);
                
                regionSelect.value = usuario.region || "";

                if (usuario.region) {
                    regionSelect.dispatchEvent(new Event('change'));
                    
                    setTimeout(() => {
                        if (comunaSelect) {
                            comunaSelect.value = usuario.comuna || "";
                        }
                    }, 50);
                }
            }
        }, 100);

    // Guardar cambios (REEMPLAZO de alerts)
    document.getElementById("guardarCambios").addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const telefonoSinFormato = telefonoInput.value.replace(/\D/g, ""); 
        const direccion = direccionInput.value.trim();
        const fotoUrl = fotoUrlInput.value.trim();
        const region = regionSelect ? regionSelect.value : "";
        const comuna = comunaSelect ? comunaSelect.value : "";

        // Validaciones
        if (username.length < 3) return mostrarModal("El nombre de usuario debe tener al menos 3 caracteres.", "Error de Validación");
        if (telefonoSinFormato && !/^[0-9]{8,15}$/.test(telefonoSinFormato)) return mostrarModal("El teléfono debe contener solo números (8 a 15 dígitos).", "Error de Validación");
        if (direccion.length < 5) return mostrarModal("La dirección debe tener al menos 5 caracteres.", "Error de Validación");
        if (!region) return mostrarModal("Debes seleccionar una región.", "Error de Validación");
        if (!comuna) return mostrarModal("Debes seleccionar una comuna.", "Error de Validación");

        // Actualizar usuario actual
        usuario.username = username;
        usuario.telefono = telefonoSinFormato; 
        usuario.direccion = direccion;
        usuario.fechaNacimiento = fechaInput.value; 
        usuario.fotoPerfil = fotoUrl || "img/header/user-logo-generic-white-alt.png";
        usuario.region = region;
        usuario.comuna = comuna; 

        // Actualizar el usuario en la lista de todos los usuarios
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioIndex = usuarios.findIndex(u => u.id === usuario.id);
        if (usuarioIndex !== -1) {
            usuarios[usuarioIndex] = usuario;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        mostrarModal("Cambios guardados correctamente.", "Actualización Exitosa", () => {
            location.reload();
        });
    });
    }

    //-------------------------------------------------------------------------------------------------------------------
    // contacto.html
    //-------------------------------------------------------------------------------------------------------------------
    const contactoForm = document.querySelector(".p-5.rounded.container.shadow");
    if (contactoForm) {
        const usernameInput = document.getElementById("username");
        const correoInput = document.getElementById("correo");
        const comentarioInput = document.getElementById("comentario");
        const enviarBtn = document.querySelector(".btn-azul-electrico");

        const avisoUsername = document.getElementById("aviso-username");
        const avisoCorreo = document.getElementById("aviso-correo");

        if (usernameInput) {
            usernameInput.addEventListener("input", () => {
                const valor = usernameInput.value.trim();
                if (valor.length >= 3) {
                    avisoUsername.textContent = "✔ Nombre válido";
                    avisoUsername.className = "mt-1 small text-success";
                } else {
                    avisoUsername.textContent = "✖ El nombre debe tener al menos 3 caracteres";
                    avisoUsername.className = "mt-1 small text-danger";
                }
            });
        }

        if (correoInput) {
            correoInput.addEventListener("input", () => {
                const correo = correoInput.value.trim();
                const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
                const esCorreoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

                if (esCorreoValido) {
                    avisoCorreo.textContent = "✔ Correo válido";
                    avisoCorreo.className = "mt-1 small text-success";
                } else {
                    avisoCorreo.textContent = "✖ Ingresa un correo de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com";
                    avisoCorreo.className = "mt-1 small text-danger";
                }
            });
        }

        if (comentarioInput) {
            comentarioInput.addEventListener("input", () => {
                const valor = comentarioInput.value.trim();
                const avisoComentario = document.getElementById("aviso-comentario"); 
                if (valor.length >= 10) {
                     if(avisoComentario) {
                         avisoComentario.textContent = "✔ Comentario válido";
                         avisoComentario.className = "mt-1 small text-success";
                     }
                } else {
                     if(avisoComentario) {
                         avisoComentario.textContent = "✖ El comentario debe tener al menos 10 caracteres";
                         avisoComentario.className = "mt-1 small text-danger";
                     }
                }
            });
        }


        enviarBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Validaciones finales antes de enviar (REEMPLAZO de alerts)
            const username = usernameInput.value.trim();
            const correo = correoInput.value.trim();
            const comentario = comentarioInput.value.trim();

            if (username.length < 3) {
                mostrarModal("El nombre debe tener al menos 3 caracteres.", "Error de Envío");
                return;
            }

            const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const esCorreoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));
            if (!esCorreoValido) {
                mostrarModal("Debes ingresar un correo de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com.", "Error de Envío");
                return;
            }

            if (comentario.length < 10) {
                mostrarModal("El comentario debe tener al menos 10 caracteres.", "Error de Envío");
                return;
            }

            // Si todas las validaciones pasan (REEMPLAZO de alerts)
            mostrarModal("¡Su mensaje ha sido enviado con éxito!", "Mensaje Enviado", () => {
                window.location.href = "main.html";
            });
        });
    }

    //-------------------------------------------------------------------------------------------------------------------
    // Fin de la lógica para contacto.html
    //-------------------------------------------------------------------------------------------------------------------

    // Para alternar contraseñas con ojo (Lógica universal)
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
});