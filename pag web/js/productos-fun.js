//Este js tiene todas las funciones para productos
/**
 * Función principal que inicializa la página de la tienda.
 * @param {Array<Object>} productos contiene el ARRAY de productos a mostrar.
 */
function inicializarTienda(productos) {
    let productosFiltrados = [...productos];
    let criterioOrden = "categoria"; // Guardamos el criterio de orden actual (por defecto "categoría")

    const contenedorPrincipal = document.getElementById('productos-section');
    if (!contenedorPrincipal) return; 
    
    // Precio máximo calculado
    const precioMaximo = productos.length > 0 ? Math.max(...productos.map(p => p.precio)) + 100000 : 100000;

    //Para generar los filtros de fabricantes y distribuidores
    function crearSeccionProductos(maxPrice, productos) {
        // Extraer fabricantes y distribuidores únicos
        const fabricantes = [...new Set(productos.map(p => p.fabricante).filter(Boolean))];
        const distribuidores = [...new Set(productos.map(p => p.distribuidor).filter(Boolean))];

        const fabricantesHtml = fabricantes.length > 0 ? fabricantes.map(f => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${f}" id="fabricante-${f}">
                <label class="form-check-label" for="fabricante-${f}">${f}</label>
            </div>
        `).join('') : '<p class="text-muted">No hay fabricantes disponibles</p>';

        const distribuidoresHtml = distribuidores.length > 0 ? distribuidores.map(d => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${d}" id="distribuidor-${d}">
                <label class="form-check-label" for="distribuidor-${d}">${d}</label>
            </div>
        `).join('') : '<p class="text-muted">No hay distribuidores disponibles</p>';

        return `
            <div class="row">
                <div class="col-md-3 mb-4">
                    <aside class="sidebar-filters p-3 border rounded">
                        <h4 class="mb-3">Filtros</h4>

                        <!-- Filtro por Precio -->
                        <div class="mb-4">
                            <h5 class="mb-2">Precio</h5>
                            <input type="range" class="form-range" min="0" max="${maxPrice}" step="1000" id="precioRange">
                            <div class="d-flex justify-content-between">
                                <span id="minPrice">$0</span>
                                <span id="maxPrice">$${maxPrice.toLocaleString('es-ES')}</span>
                            </div>
                        </div>

                        <!-- Filtro por Fabricante -->
                        <div class="mb-4">
                            <h5 class="mb-2">Fabricante</h5>
                            ${fabricantesHtml}
                        </div>

                        <!-- Filtro por Distribuidor -->
                        <div class="mb-4">
                            <h5 class="mb-2">Distribuidor</h5>
                            ${distribuidoresHtml}
                        </div>

                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button" id="aplicarFiltros">Aplicar filtros</button>
                            <button class="btn btn-outline-secondary" type="button" id="limpiarFiltros">Limpiar filtros</button>
                        </div>
                    </aside>
                </div>

                <div class="col-md-9">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="m-0" style="color: white;" id="contador-resultados"></h5>
                        
                        <!-- Dropdown Ordenar -->
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownOrdenar"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Ordenar por
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownOrdenar">
                                <li><a class="dropdown-item ordenar-opcion" data-orden="categoria" href="#">Categoría</a></li>
                                <li><a class="dropdown-item ordenar-opcion" data-orden="mas-vendidos" href="#">Más vendidos</a></li>
                                <li><a class="dropdown-item ordenar-opcion" data-orden="precio-asc" href="#">Precio: de menor a mayor</a></li>
                                <li><a class="dropdown-item ordenar-opcion" data-orden="precio-desc" href="#">Precio: de mayor a menor</a></li>
                                <li><a class="dropdown-item ordenar-opcion" data-orden="nombre-asc" href="#">Nombre: A-Z</a></li>
                                <li><a class="dropdown-item ordenar-opcion" data-orden="nombre-desc" href="#">Nombre: Z-A</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row" id="contenedor-productos"></div>
                </div>
            </div>
        `;
    }

    //Para crear las tarjetas con cada uno de los productos
function crearTarjetaProducto(producto) {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const tieneDescuento = usuario?.descuentoDuoc || false;
    const precioFinal = tieneDescuento ? Math.round(producto.precio * 0.8) : producto.precio;

    return `
        <div class="col-md-4 mb-4">
            <a href="${producto.enlace}" class="card-link">
                <div class="card h-100 d-flex flex-column">
                    <img class="card-img-top padding_top rounded w-100" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title text-white">${producto.nombre}</h4>
                        <p class="card-text text-lightgray">
                            Codigo: ${producto.codigo} <br>
                            Fabricante: ${producto.fabricante} <br>
                            Distribuidor: ${producto.distribuidor}
                        </p>
                        <div class="mt-auto d-flex justify-content-end">
                            <div style="background-color: #1E90FF;" class="btn btn-primary">
                                $${precioFinal.toLocaleString('es-ES')}
                                ${tieneDescuento ? '<small class="text-warning">(-20%)</small>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}


    //Para cada uno de los filtros
    function aplicarFiltros() {
        let productosFiltradosTemp = [...productos];
        const precioMax = document.getElementById('precioRange').value;
        const checkboxes = Array.from(document.querySelectorAll('.form-check-input'));
        const fabricantesSeleccionados = checkboxes.filter(cb => cb.id.includes('fabricante') && cb.checked).map(cb => cb.value);
        const distribuidoresSeleccionados = checkboxes.filter(cb => cb.id.includes('distribuidor') && cb.checked).map(cb => cb.value);

        productosFiltradosTemp = productosFiltradosTemp.filter(p => p.precio <= precioMax);

        if (fabricantesSeleccionados.length > 0) {
            productosFiltradosTemp = productosFiltradosTemp.filter(p => fabricantesSeleccionados.includes(p.fabricante));
        }
        if (distribuidoresSeleccionados.length > 0) {
            productosFiltradosTemp = productosFiltradosTemp.filter(p => distribuidoresSeleccionados.includes(p.distribuidor));
        }

        // Aplicar el orden que requiera el usuario
        if (criterioOrden === "precio-asc") {
            productosFiltradosTemp.sort((a, b) => a.precio - b.precio);
        } else if (criterioOrden === "precio-desc") {
            productosFiltradosTemp.sort((a, b) => b.precio - a.precio);
        } else if (criterioOrden === "nombre-asc") {
            productosFiltradosTemp.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (criterioOrden === "nombre-desc") {
            productosFiltradosTemp.sort((a, b) => b.nombre.localeCompare(a.nombre));
        } else if (criterioOrden === "mas-vendidos") {
            // Orden aleatorio para simular "más vendidos"
            productosFiltradosTemp.sort(() => Math.random() - 0.5);
        } 
        // "categoria" simplemente mantiene el orden original

        productosFiltrados = productosFiltradosTemp;
        mostrarProductos(productosFiltrados);
    }

    function mostrarProductos(listaProductos) {
        const contenedorProductos = document.getElementById('contenedor-productos');
        const contadorRes = document.getElementById('contador-resultados');
        
        contenedorProductos.innerHTML = listaProductos.map(crearTarjetaProducto).join('');
        contadorRes.textContent = `${listaProductos.length} resultados`;
    }

    // Generar el HTML de la sección de productos
    contenedorPrincipal.innerHTML = crearSeccionProductos(precioMaximo, productos);

    // Controles de los filtros
    const precioRange = document.getElementById('precioRange');
    const maxPriceSpan = document.getElementById('maxPrice');
    const aplicarBtn = document.getElementById('aplicarFiltros');
    const limpiarBtn = document.getElementById('limpiarFiltros');

    precioRange.value = precioRange.max;
    maxPriceSpan.textContent = `$${parseInt(precioRange.value).toLocaleString('es-ES')}`;

    precioRange.addEventListener('input', e => {
        maxPriceSpan.textContent = `$${parseInt(e.target.value).toLocaleString('es-ES')}`;
    });

    aplicarBtn.addEventListener('click', aplicarFiltros);

    limpiarBtn.addEventListener('click', () => {
        document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);
        precioRange.value = precioRange.max;
        maxPriceSpan.textContent = `$${parseInt(precioRange.max).toLocaleString('es-ES')}`;
        aplicarFiltros();
    });

    // Eventos para generar ordenar por
    document.querySelectorAll('.ordenar-opcion').forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.preventDefault();
            criterioOrden = opcion.dataset.orden;
            aplicarFiltros();
        });
    });

    // Inicializar la página mostrando todos los productos
    aplicarFiltros();
}


// Inicialización al cargar la página solo apretando productos (sin filtro)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaParam = urlParams.get('categoria');

    // Objeto con todas las categorías
    const categorias = {
        figuras,
        juegos_de_mesa,
        accesorios,
        consolas,
        computadoras_gamer: pc_gamer,
        sillas_gamer,
        mouse,
        mousepad,
        poleras_personalizadas,
        todos: todosLosProductos
    };

    // Seleccionar productos según la categoría o mostrar todos si no existe
    const productosAMostrar = categorias[categoriaParam] || todosLosProductos;

    inicializarTienda(productosAMostrar);
});


function obtenerProductosAleatorios(productos, cantidad) {
  const copia = [...productos];
  const seleccionados = [];
  while (seleccionados.length < cantidad && copia.length > 0) {
    const indice = Math.floor(Math.random() * copia.length);
    seleccionados.push(copia.splice(indice, 1)[0]);
  }
  return seleccionados;
}

// Función para mostrar 3 productos "más vendidos" al azar en main.html
function mostrarMasVendidos() {
    const contenedor = document.getElementById('mas-vendidos');
    if (!contenedor) return;

    // Tomamos 3 productos al azar
    const productosSeleccionados = todosLosProductos
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // Obtenemos el usuario actual
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    contenedor.innerHTML = productosSeleccionados.map(producto => {
        let precioFinal = producto.precio;

        if (usuarioActual && usuarioActual.descuentoDuoc) {
            precioFinal = Math.round(producto.precio * 0.8); // 20% de descuento
        }

        return `
            <div class="col-md-4 mb-4">
                <a href="${producto.enlace}" class="card-link">
                    <div class="card h-100">
                        <img class="card-img-top padding_top rounded w-100" src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="card-body">
                            <h4 class="card-title text-white">${producto.nombre}</h4>
                            <p class="card-text text-lightgray">
                                Fabricante: ${producto.fabricante} <br>
                                Distribuidor: ${producto.distribuidor}
                            </p>
                            <div class="padding_top">
                                <div style="background-color: #1E90FF;" class="btn btn-primary">
                                    $${precioFinal.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');
}

