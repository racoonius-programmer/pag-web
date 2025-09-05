document.addEventListener('DOMContentLoaded', function () {
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
  <!-- Link principal -->
  <a class="nav-link" href="productos.html" id="productosDropdown">Productos</a>

  <!-- Dropdown que se activa al pasar el mouse -->
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

                </ul>
              </li>
            </ul>
            <form class="d-flex" action="main.html" method="get">
              <input class="form-control me-2" type="text" name="q" placeholder="Introduce tu búsqueda">
              <button class="btn btn-primary" type="submit">Buscar</button>
            </form>
            <a class="navbar-nav nav-link dropdown-toggle ms-3 align-items-end" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="img/header/user-logo-generic-white-alt.png" alt="Usuario" style="width: 60px;">
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="user_registro.html">Registro</a></li>
              <li><a class="dropdown-item" href="user_inicio_sesion.html">Iniciar Sesión</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `
    ;

  // Insert the HTML into the body or a specific container
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
});

document.addEventListener('DOMContentLoaded', function () {
  const footerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
      <footer class="py-3 bg-black orbitron ">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><a href="main.html" class="nav-link px-2 text-light">Inicio</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Contacto</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Nosotros</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Sucursales</a></li>
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

  // Insert the HTML at the end of the body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
});
