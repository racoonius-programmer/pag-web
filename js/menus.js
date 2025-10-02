// menus.js

// -------------------------------------------------------------------------------------
// FUNCIÓN GLOBAL PARA MOSTRAR MODAL (Integrada aquí para disponibilidad en toda la app)
// -------------------------------------------------------------------------------------
// Esta variable es necesaria para poder eliminar el manejador de eventos anterior
// y se define en el ámbito global del script para que persista.
let modalHiddenHandler = null; 

/**
 * Función para mostrar el modal de Bootstrap 5 usando JS nativo.
 * Reemplaza todos los alert().
 */
function mostrarModal(mensaje, titulo = "Mensaje", callback = null) {
    // Nota: El HTML del modal 'generalModal' se inyecta más abajo en este mismo script.
    const modalElement = document.getElementById('generalModal');
    if (!modalElement) {
        console.error("No se encontró el modal con ID 'generalModal'.");
        return;
    }

    // Inicializar el modal de Bootstrap
    // Se asume que bootstrap.bundle.min.js está cargado antes de este script.
    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('modalTitle').textContent = titulo;
    document.getElementById('modalBody').textContent = mensaje;
    
    // --- LÓGICA DE CALLBACK CON JS NATIVO (Reemplazo de jQuery) ---
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

// -------------------------------------------------------------------------------------
// GENERACIÓN DE HEADER
// -------------------------------------------------------------------------------------

// Para generar el header en todas las páginas
document.addEventListener('DOMContentLoaded', function () {
    // Espera a que la página cargue.

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
 // Construye un bloque HTML completo para el menú de navegación.  
    const navbarHTML = `
      <nav style="width: 100%; height: 100%;" class="navbar navbar-expand-sm navbar-dark bg-black">
        <div class="container-fluid">
          <a href="main.html">
            <img src="img/header/logo_sin_fondo.png" alt="Logo" style="width:60px;">
          </a>
          <a class="navbar-brand ms-2" href="main.html">Level-up Gamer</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link" href="sobreLEVEL-UP.html">¿Quienes somos?</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="productos.html" id="productosDropdown">Productos</a>
                <ul class="dropdown-menu" aria-labelledby="productosDropdown">
                  <li><a class="dropdown-item" href="productos.html?categoria=figuras">Figuras</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=juegos_de_mesa">Juegos de mesa</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=accesorios">Accesorios</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=consolas">Consolas</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=computadoras_gamer">Computadores gamers</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=sillas_gamer">Sillas gamer</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=mouse">Mouse</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=mousepad">MousePad</a></li>
                  <li><a class="dropdown-item" href="productos.html?categoria=poleras_personalizadas">Poleras/Polerones personalizados</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="eventos.html">Eventos</a>
              </li>
            </ul>

            <form class="d-flex" action="main.html" method="get">
              <input class="form-control me-2" type="text" name="productoSearch" id="productoSearch" placeholder="Introduce tu búsqueda">
              <button class="btn btn-primary" type="submit">Buscar</button>
            </form>

            <a class="navbar-nav nav-link dropdown-toggle ms-3 align-items-end" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${usuarioActual ? usuarioActual.fotoPerfil : 'img/header/user-logo-generic-white-alt.png'}" alt="Usuario" style="width: 60px;">
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              ${
                usuarioActual
                  ? `
                    <li><span class="dropdown-item-text">👤 ${usuarioActual.username}</span></li>
                    <li><span class="dropdown-item-text">Level-Up: Nivel 1</span></li>
                    <li><a class="dropdown-item" href="user_perfil.html">Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="carrito.html">Mi Carrito</a></li>
                    ${
                      usuarioActual.rol === "admin"
                        ? `<li><a class="dropdown-item" href="admin_main.html">Panel de Administración</a></li>`
                        : ''
                    }
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="cerrar-sesion">Cerrar Sesión</a></li>
                  `
                  : `
                    <li><a class="dropdown-item" href="user_registro.html">Registro</a></li>
                    <li><a class="dropdown-item" href="user_inicio_sesion.html">Iniciar Sesión</a></li>
                  `
              }
            </ul>
          </div>
        </div>
      </nav>
    `;
    
    // Lo inserta al inicio del body de cada página
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Funcionalidad cerrar sesión (Uso del modal no es necesario aquí, la redirección es directa)
    const btnCerrarSesion = document.getElementById("cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActual");
            window.location.href = "main.html"; // recarga al home
        });
    }
});

// -------------------------------------------------------------
// GENERACIÓN DE FOOTER Y MODAL
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const footerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
        <footer class="py-3 bg-black orbitron ">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="main.html" class="nav-link px-2 text-light">Inicio</a></li>
            <li class="nav-item"><a href="contacto.html" class="nav-link px-2 text-light">Contacto</a></li>
            <li class="nav-item"><a href="sobreLEVEL-UP.html" class="nav-link px-2 text-light">¿Quiénes somos?</a></li>
          </ul>
          <p class="text-center text-light">© 2025 Level-Up Gamer</p>
          <div class="text-center mb-3">
            <a href="https://facebook.com/ficticio" target="_blank" class="text-light px-2">
              <i class="bi bi-facebook fs-4"></i>
            </a>
            <a href="https://instagram.com/ficticio" target="_blank" class="text-light px-2">
              <i class="bi bi-instagram fs-4"></i>
            </a>
            <a href="https://twitter.com/ficticio" target="_blank" class="text-light px-2">
              <i class="bi bi-twitter fs-4"></i>
            </a>
          </div>
        </footer>
    `;

    // 1. Lo inserta al final del body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // --- CÓDIGO DEL MODAL Y SU ESTILO (Inyectado al final del body) ---
    const modalHTML = `
        <div class="modal fade" id="generalModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            
            <div class="modal-content modal-content-dark">
              <div class="modal-header">
                <h5 class="modal-title text-light" id="modalTitle">Título del Modal</h5>
                <button type="button" class="btn-close btn-close-white btn-close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-light" id="modalBody">
                Contenido del mensaje.
              </div>
              <div class="modal-footer border-top-0">
                <button type="button" class="btn btn-secondary btn-close-modal" data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>

        <style>
        .modal-content-dark {
            background-color: #343a40; /* Fondo oscuro */
            color: #fff; /* Texto blanco */
            border: 1px solid #454d55; /* Borde sutil */
        }
        .modal-header {
            border-bottom: 1px solid #454d55;
        }
        .modal-footer {
            border-top: none;
        }
        .btn-close-white {
            filter: invert(1) grayscale(100%) brightness(200%); /* Hace la X blanca */
        }
        </style>
    `;

    // 2. Insertamos el modal y su CSS personalizado al final del body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});