// Este archivo contiene todas las funciones para manejar los productos en la tienda
// y en la página principal.

/**
 * Retorna el precio final de un producto, aplicando descuento si el usuario está
 * logueado y tiene la propiedad de descuento.
 * @param {Object} producto - El objeto del producto.
 * @returns {Object} Un objeto con el precio final y un booleano que indica si se aplicó descuento.
 */
function calcularPrecioFinal(producto) {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const tieneDescuento = usuario?.correo?.endsWith('@duoc.cl') || usuario?.descuentoDuoc || false;
    const precioFinal = tieneDescuento ? Math.round(producto.precio * 0.8) : producto.precio;
    return { precioFinal, tieneDescuento };
}

/**
 * Crea el HTML de una tarjeta de producto.
 * @param {Object} producto - El objeto del producto.
 * @returns {string} El string de HTML de la tarjeta de producto.
 */
function crearTarjetaProducto(producto) {
    const { precioFinal, tieneDescuento } = calcularPrecioFinal(producto);

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

/**
 * Genera el HTML para la sección de productos, incluyendo los filtros y el área de listado.
 * @param {number} maxPrice - El precio máximo para el slider de filtro.
 * @param {Array<Object>} productos - El array de productos para generar los filtros de fabricante y distribuidor.
 * @returns {string} El HTML completo de la sección de productos.
 */
function crearSeccionProductos(maxPrice, productos) {
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
                    <div class="mb-4">
                        <h5 class="mb-2">Precio</h5>
                        <input type="range" class="form-range" min="0" max="${maxPrice}" step="1000" id="precioRange">
                        <div class="d-flex justify-content-between">
                            <span id="minPrice">$0</span>
                            <span id="maxPrice">$${maxPrice.toLocaleString('es-ES')}</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <h5 class="mb-2">Fabricante</h5>
                        ${fabricantesHtml}
                    </div>
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

/**
 * Muestra el número de productos filtrados y renderiza las tarjetas de producto en el DOM.
 * @param {Array<Object>} listaProductos - El array de productos a mostrar.
 */
function mostrarProductos(listaProductos) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    const contadorRes = document.getElementById('contador-resultados');
    
    if (contenedorProductos && contadorRes) {
        contenedorProductos.innerHTML = listaProductos.map(crearTarjetaProducto).join('');
        contadorRes.textContent = `${listaProductos.length} resultados`;
    }
}

/**
 * Aplica los filtros y el orden a la lista de productos y actualiza la vista.
 * @param {Array<Object>} productosBase - El array de productos inicial antes de filtrar y ordenar.
 */
function aplicarFiltros(productosBase) {
    let productosFiltradosTemp = [...productosBase];
    const precioRange = document.getElementById('precioRange');
    const precioMax = precioRange ? precioRange.value : 100000000;
    
    if (!precioRange) return;

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

    const criterioOrden = document.querySelector('.ordenar-opcion.active')?.dataset.orden || "categoria";
    
    if (criterioOrden === "precio-asc") {
        productosFiltradosTemp.sort((a, b) => a.precio - b.precio);
    } else if (criterioOrden === "precio-desc") {
        productosFiltradosTemp.sort((a, b) => b.precio - a.precio);
    } else if (criterioOrden === "nombre-asc") {
        productosFiltradosTemp.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (criterioOrden === "nombre-desc") {
        productosFiltradosTemp.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (criterioOrden === "mas-vendidos") {
        productosFiltradosTemp.sort(() => Math.random() - 0.5);
    } 

    mostrarProductos(productosFiltradosTemp);
}

/**
 * Función principal que inicializa la página de la tienda.
 */
function inicializarTienda() {
    let productosGuardados = JSON.parse(localStorage.getItem("todosLosProductos"));

    if (!productosGuardados || productosGuardados.length === 0) {
        productosGuardados = [...todosLosProductos];
        localStorage.setItem("todosLosProductos", JSON.stringify(productosGuardados));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const categoriaParam = urlParams.get('categoria');
    const categorias = {
        figuras, juegos_de_mesa, accesorios, consolas,
        computadoras_gamer: pc_gamer, sillas_gamer, mouse,
        mousepad, poleras_personalizadas, todos: productosGuardados
    };
    const productosAMostrar = categorias[categoriaParam] || productosGuardados;

    const contenedorPrincipal = document.getElementById('productos-section');
    if (!contenedorPrincipal) return; 
    
    const precioMaximo = productosAMostrar.length > 0 ? Math.max(...productosAMostrar.map(p => p.precio)) + 100000 : 100000;
    contenedorPrincipal.innerHTML = crearSeccionProductos(precioMaximo, productosAMostrar);

    const precioRange = document.getElementById('precioRange');
    const maxPriceSpan = document.getElementById('maxPrice');
    const aplicarBtn = document.getElementById('aplicarFiltros');
    const limpiarBtn = document.getElementById('limpiarFiltros');

    if (precioRange) {
        precioRange.value = precioRange.max;
        maxPriceSpan.textContent = `$${parseInt(precioRange.value).toLocaleString('es-ES')}`;

        precioRange.addEventListener('input', e => {
            maxPriceSpan.textContent = `$${parseInt(e.target.value).toLocaleString('es-ES')}`;
        });
    }

    if (aplicarBtn) aplicarBtn.addEventListener('click', () => aplicarFiltros(productosAMostrar));
    if (limpiarBtn) limpiarBtn.addEventListener('click', () => {
        document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);
        if (precioRange) {
            precioRange.value = precioRange.max;
            maxPriceSpan.textContent = `$${parseInt(precioRange.max).toLocaleString('es-ES')}`;
        }
        aplicarFiltros(productosAMostrar);
    });

    document.querySelectorAll('.ordenar-opcion').forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.ordenar-opcion').forEach(el => el.classList.remove('active'));
            opcion.classList.add('active');
            aplicarFiltros(productosAMostrar);
        });
    });

    aplicarFiltros(productosAMostrar);
}

/**
 * Muestra 3 productos al azar en la sección "Más vendidos" de la página principal.
 */
function mostrarMasVendidos() {
    const contenedor = document.getElementById('mas-vendidos');
    if (!contenedor) return;

    let productosActualizados = JSON.parse(localStorage.getItem("todosLosProductos"));
    if (!productosActualizados) {
        productosActualizados = [...todosLosProductos];
    }
    
    const productosSeleccionados = productosActualizados
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    contenedor.innerHTML = productosSeleccionados.map(crearTarjetaProducto).join('');
}

// Inicialización de la página al cargar el DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de la tienda, la inicializamos
    if (document.getElementById('productos-section')) {
        inicializarTienda();
    }
    // Si estamos en la página principal, mostramos los más vendidos
    if (document.getElementById('mas-vendidos')) {
        mostrarMasVendidos();
    }
});