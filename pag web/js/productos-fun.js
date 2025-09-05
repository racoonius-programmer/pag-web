// ======================================
// Archivo: productos-fun.js
// Contiene la lógica reutilizable para las páginas de productos.
// ======================================

/**
 * Función principal que inicializa la página de la tienda.
 * @param {Array<Object>} productos El array de objetos de productos a mostrar.
 */
function inicializarTienda(productos) {
    let productosFiltrados = [...productos];

    const contenedorPrincipal = document.getElementById('productos-section');
    
    // Precio máximo calculado
    const precioMaximo = productos.length > 0 ? Math.max(...productos.map(p => p.precio)) + 100000 : 100000;

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
                </div>
                <div class="row" id="contenedor-productos"></div>
            </div>
        </div>
    `;
}


function crearTarjetaProducto(producto) {
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
                        <!-- Spacer para empujar el precio abajo -->
                        <div class="mt-auto d-flex justify-content-end">
                            <div style="background-color: #1E90FF;" class="btn btn-primary">$${producto.precio.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}


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
;

    // Controles
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

    // Inicializar la página mostrando todos los productos
    aplicarFiltros();
}

// ======================================
// Inicialización al cargar la página
// ======================================
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
