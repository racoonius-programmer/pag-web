//Base de datos simulada de productos

//Creamos cada una de las variables para separarlos por categorias
const figuras = [
    {
        codigo: "FG001",
        nombre: "Frodo",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/frodoIMGchetaaPNG.png",
        precio: 29990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        Marca: "Lord of the Rings Toys",
        Material: "Plastico de calidad",
        Descripcion: "Una figura detallada que captura la valentía y la carga del Portador del Anillo. Ideal para quienes aprecian al héroe más inesperado de la Tierra Media",
        enlace: "producto-detalle.html?codigo=FG001"
    },
    {
        codigo: "FG002",
        nombre: "Gandalf el gris",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/gandaflIMGcheta.png",
        precio: 39990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        Marca: "Lord of the Rings Toys",
        Material: "Plastico de calidad",
        Descripcion: "Una figura detallada que captura la sabiduría y el poder del mago más icónico de la Tierra Media",
        enlace: "producto-detalle.html?codigo=FG002"
    },
    {
        codigo: "FG003",
        nombre: "Gimli",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/gimliIMGcheta.jpg",
        precio: 49990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        Marca: "Lord of the Rings Toys",
        Material: "Plastico de calidad",
        Descripcion: "Figura del enano Gimli con todos sus detalles característicos, ideal para los amantes de la Tierra Media",
        enlace: "producto-detalle.html?codigo=FG003"
    },
    {
        codigo: "FG004",
        nombre: "Legolas",
        imagen: "img/productos/IMAGENES_DE_FIGURAS/figuraDeLegolas.webp",
        precio: 59990,
        fabricante: "Lord of the Rings Toys",
        distribuidor: "Lord of the Rings Toys",
        Marca: "Lord of the Rings Toys",
        Material: "Plastico de calidad",
        Descripcion: "Figura de Legolas con su arco y flechas, perfecta para los coleccionistas de la Tierra Media",
        enlace: "producto-detalle.html?codigo=FG004"
    }
];



const juegos_de_mesa = [
    {
        codigo: "JM001",
        nombre: "Catan",
        imagen: "img/productos/IMAGENES_JUEGOS_DE_MESA/catan.webp",
        precio: 29990,
        fabricante: "Catan Studio",
        distribuidor: "Distribuidora Catan",
        Marca: "Catan Studio",
        Material: "Cartón y plástico de calidad",
        Descripcion: "Juego de estrategia clásico donde colonizas la isla de Catan, intercambiando recursos y construyendo asentamientos.",
        enlace: "producto-detalle.html?codigo=JM001"
    },
    {
        codigo: "JM002",
        nombre: "Carcassonne",
        imagen: "img/productos/IMAGENES_JUEGOS_DE_MESA/CARCASSONE.webp",
        precio: 24990,
        fabricante: "Rio Grande Games",
        distribuidor: "Devir Chile",
        Marca: "Rio Grande Games",
        Material: "Cartón y fichas de madera",
        Descripcion: "Juego de colocación de losetas donde construyes ciudades, caminos y monasterios en la región medieval de Carcassonne.",
        enlace: "producto-detalle.html?codigo=JM002"
    }
];

const accesorios = [
    {
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        imagen: "img/productos/img_accesorios/control_xbox.jpg",
        precio: 59990,
        fabricante: "Xbox",
        distribuidor: "Xbox Chile",
        Marca: "Xbox",
        Material: "Plástico y componentes electrónicos",
        Descripcion: "Control inalámbrico oficial de Xbox Series X, con ergonomía y precisión para gaming competitivo.",
        enlace: "producto-detalle.html?codigo=AC001"
    },
    {
        codigo: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        imagen: "img/productos/img_accesorios/audi_gamer_hx_cloud2.jpg",
        precio: 74990,
        fabricante: "HyperX",
        distribuidor: "HyperX Chile",
        Marca: "HyperX",
        Material: "Plástico, cuero sintético y componentes electrónicos",
        Descripcion: "Auriculares gamer con sonido envolvente, micrófono desmontable y gran comodidad para largas sesiones de juego.",
        enlace: "producto-detalle.html?codigo=AC002"
    }
];

const consolas = [
    {
        codigo: "CO001",
        nombre: "PlayStation 5",
        imagen: "img/productos/img_consolas/playstation5.png",
        precio: 549990,
        fabricante: "Sony",
        distribuidor: "Sony Chile",
        Marca: "Sony",
        Material: "Plástico y componentes electrónicos",
        Descripcion: "Consola de última generación con gráficos de alta calidad, carga ultrarrápida y gran biblioteca de juegos.",
        enlace: "producto-detalle.html?codigo=CO001"
    }
];

const pc_gamer = [
    {
        codigo: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        imagen: "img/productos/img_pcgamers/pc_gamer_asus_strix.png",
        precio: 1299990,
        fabricante: "Asus",
        distribuidor: "Asus Chile",
        Marca: "Asus",
        Material: "Metal, plástico y componentes electrónicos",
        Descripcion: "PC gamer de alto rendimiento con procesador potente, tarjeta gráfica avanzada y sistema de refrigeración optimizado.",
        enlace: "producto-detalle.html?codigo=CG001"
    }
];

const sillas_gamer = [
    {
        codigo: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        imagen: "img/productos/img_sillas_gamer/Silla Gamer Secretlab Titan.jpg",
        precio: 349990,
        fabricante: "Secret Lab",
        distribuidor: "Secret Lab",
        Marca: "Secret Lab",
        Material: "Cuero sintético y espuma de alta densidad",
        Descripcion: "Silla ergonómica para gamers, ajustable y cómoda, ideal para largas sesiones de juego.",
        enlace: "producto-detalle.html?codigo=SG001"
    }
];

const mouse = [
    {
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        imagen: "img/productos/img_mouse/Mouse_Gamer_Logitech_G502_HERO.jpg",
        precio: 49990,
        fabricante: "Logitech",
        distribuidor: "Logitech Chile",
        Marca: "Logitech",
        Material: "Plástico y componentes electrónicos",
        Descripcion: "Mouse gamer de alta precisión con múltiples botones programables y sensor HERO 16K para juegos competitivos.",
        enlace: "producto-detalle.html?codigo=MS001"
    }
];

const mousepad = [
    {
        codigo: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        imagen: "img/productos/img_mousepad/Mousepad_Razer_Goliathus_Extended_Chroma.webp",
        precio: 29990,
        fabricante: "Razer",
        distribuidor: "Razer",
        Marca: "Razer",
        Material: "Tela y base de goma antideslizante",
        Descripcion: "Mousepad extendido con iluminación Chroma, superficie optimizada para precisión y velocidad.",
        enlace: "producto-detalle.html?codigo=MP001"
    }
];

const poleras_personalizadas = [
    {
        codigo: "PP001",
        nombre: "Polera Gamer Personalizada 'Level-Up'",
        imagen: "img/productos/img_poleras_personalizadas/polera_level_up.png",
        precio: 14990,
        fabricante: "Level-Up Gamer",
        distribuidor: "Level-Up Gamer",
        Marca: "Level-Up Gamer",
        Material: "Algodón de alta calidad",
        Descripcion: "Polera gamer personalizada con diseño 'Level-Up', cómoda y resistente para gamers de corazón.",
        enlace: "producto-detalle.html?codigo=PP001"
    }
];


//Creamos una constante con todos los productos para llamarlos en productos.html
const todosLosProductos = [
    ...figuras,
    ...juegos_de_mesa,
    ...accesorios,
    ...consolas,
    ...pc_gamer,
    ...sillas_gamer,
    ...mouse,
    ...mousepad,
    ...poleras_personalizadas
];

