// ======================================
// Archivo: figuras.js
// Contiene los datos de la categoría "Figuras"
// ======================================
const figuras = [
    {   codigo: "FG001",
        nombre: "Frodo",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/frodoIMGchetaaPNG.png",
        precio: 29990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        enlace: "INFOfiguraDeFrodoYgollum.html"
    },
    {    codigo: "FG004",
        nombre: "Gandalf el gris",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/gandaflIMGcheta.png",
        precio: 39990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        enlace: "INFOfiguraDeGandalfElGris.html"
    },
    {   
        codigo: "FG003",
        nombre: "Gimli",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/gimliIMGcheta.jpg",
        precio: 49990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        enlace: "INFOfiguraDeGimli.html"
    },
    {    codigo: "FG004",
        nombre: "Legolas",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/figuraDeLegolas.webp",
        precio: 59990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        enlace: "htmlFIGURAS/INFOfiguraLelogas.html"
    }
];


const juegos_de_mesa = [
    {   codigo: "JM001",
        nombre: "Catan",
        imagen: "img/productos/IMAGENES_JUEGOS_DE_MESA/catan.webp",
        precio: 29990,
        fabricante: "Catan Studio",
        distribuidor: "Distruibuidora Catan",
        enlace: "#"
    },
    {   codigo: "JM002",
        nombre: "Carcassonne",
        imagen: "img/productos/IMAGENES_JUEGOS_DE_MESA/CARCASSONE.webp",
        precio: 24990,
        fabricante: "Rio grande games",
        distribuidor: "Devir Chile",
        enlace: "#"
    },
   
];


const accesorios = [
    {   codigo: "AC001",
        nombre: "Controlador Inalambrico Xbox Series X",
        imagen: "img/productos/img_accesorios/control_xbox.jpg",
        precio: 59990,
        fabricante: "Xbox",
        distribuidor: "Xbox Chile",
        enlace: "#"
    },
    {
        nombre: "Auriculares Gamer HyperX Cloud II ",
        imagen: "img/productos/img_accesorios/audi_gamer_hx_cloud2.jpg",
        precio: 74990,
        fabricante: "Hyper X",
        distribuidor: "Hyper X Chile",
        enlace: "#"
    },
   
];


const consolas = [
    {   codigo: "CO001",
        nombre: "Playsation 5",
        imagen: "img/productos/img_consolas/playstation5.png",
        precio: 549990,
        fabricante: "Sony",
        distribuidor: "Sony Chile",
        enlace: "#"
    }
   
];



const pc_gamer = [
    {   codigo: "CG001",
        nombre: "PC Gamer ASUS ROG Strix ",
        imagen: "img/productos/img_pcgamers/pc_gamer_asus_strix.png",
        precio: 1299990,
        fabricante: "Asus",
        distribuidor: "Asus Chile",
        enlace: "#"
    }
   
];

const sillas_gamer = [
    {   codigo: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        imagen: "img/productos/img_sillas_gamer/Silla Gamer Secretlab Titan.jpg",
        precio: 349990,
        fabricante: "Secret Lab",
        distribuidor: "Secret Lab",
        enlace: "#"
    }
   
];

const mouse = [
    {   codigo: "MS001",
        nombre: " Mouse Gamer Logitech G502 HERO ",
        imagen: "img/productos/img_mouse/Mouse_Gamer_Logitech_G502_HERO.jpg",
        precio: 49990,
        fabricante: "Logitech",
        distribuidor: "Logitech Chile",
        enlace: "#"
    }
   
];

const mousepad = [
    {   codigo: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        imagen: "img/productos/img_mousepad/Mousepad_Razer_Goliathus_Extended_Chroma.webp",
        precio: 29990,
        fabricante: "Razer",
        distribuidor: "Razer",
        enlace: "#"
    }
   
];




const poleras_personalizadas = [
    {   codigo: "PP001",
        nombre: "Polera Gamer Personalizada 'Level-Up' ",
        imagen: "img/productos/img_poleras_personalizadas/polera_level_up.png",
        precio: 14990,
        fabricante: "Level-Up Gamer",
        distribuidor: "Level-Up Gamer",
        enlace: "#"
    }
   
];




// ======================================
// Archivo: menus.js
// Contiene la lógica reutilizable para las páginas de productos.
// ======================================

/**
 * Función principal que inicializa la página de la tienda.
 * @param {Array<Object>} productos El array de objetos de productos a mostrar.
 */
function inicializarTienda(productos) {
    let productosFiltrados = [...productos];
    // Se elimina la variable de ordenación

    const contenedorPrincipal = document.getElementById('productos-section');
    
    // Se calcula el precio máximo como el precio más alto del array + 100.000.
    const precioMaximo = productos.length > 0 ? Math.max(...productos.map(p => p.precio)) + 100000 : 100000;

    function crearSeccionProductos(maxPrice) {
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
                    <div class="card h-100">
                        <img class="card-img-top padding_top rounded w-100" src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="card-body">
                            <h4 class="card-title text-white">${producto.nombre}</h4>
                            <p class="card-text text-lightgray">
                                Codigo: ${producto.codigo} <br>
                                Fabricante: ${producto.fabricante} <br>
                                Distribuidor: ${producto.distribuidor}
                            </p>
                            <div class="padding_top">
                                <div style="background-color: #1E90FF;" class="btn btn-primary">$${producto.precio.toLocaleString('es-ES')}</div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    function aplicarFiltrosYOrden() {
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

        // Se ha eliminado la lógica de ordenación

        productosFiltrados = productosFiltradosTemp;
        mostrarProductos(productosFiltrados);
    }

    function mostrarProductos(listaProductos) {
        const contenedorProductos = document.getElementById('contenedor-productos');
        const contadorRes = document.getElementById('contador-resultados');
        
        let htmlProductos = '';
        listaProductos.forEach(producto => {
            htmlProductos += crearTarjetaProducto(producto);
        });

        contenedorProductos.innerHTML = htmlProductos;
        contadorRes.textContent = `${listaProductos.length} resultados`;
    }

    // Generar el HTML de la sección de productos
    contenedorPrincipal.innerHTML = crearSeccionProductos(precioMaximo);

    // Añadir Event Listeners a los controles que se acaban de crear
    const precioRange = document.getElementById('precioRange');
    const maxPriceSpan = document.getElementById('maxPrice');
    const aplicarBtn = document.getElementById('aplicarFiltros');
    const limpiarBtn = document.getElementById('limpiarFiltros');
    // Se ha eliminado la variable y el evento del menú de ordenación

    precioRange.value = precioRange.max;
    maxPriceSpan.textContent = `$${parseInt(precioRange.value).toLocaleString('es-ES')}`;

    precioRange.addEventListener('input', (e) => {
        maxPriceSpan.textContent = `$${parseInt(e.target.value).toLocaleString('es-ES')}`;
    });

    aplicarBtn.addEventListener('click', aplicarFiltrosYOrden);
    
    limpiarBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach(cb => cb.checked = false);
        precioRange.value = precioRange.max;
        maxPriceSpan.textContent = `$${parseInt(precioRange.max).toLocaleString('es-ES')}`;
        // Se ha eliminado el restablecimiento de la ordenación
        aplicarFiltrosYOrden();
    });

    // Inicializar la página mostrando todos los productos
    aplicarFiltrosYOrden();
}