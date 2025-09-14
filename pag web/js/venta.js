//Genera automaticamente la producto-detalles.html sacando los datos del producto
function renderizarPaginaProducto(producto) {
    const contenedor = document.getElementById('product-container');
    if (!contenedor) return;

    // Ver si el usuario está logeado buscando en la variable local usarioActual
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioActual")) || null;
    const esDuoc = usuarioLogueado && usuarioLogueado.descuentoDuoc === true;

    // Calcular descuento si es DUOC
    let precioFinal = producto.precio;
    let descuentoHTML = "";
    if (esDuoc) {
        const precioConDescuento = Math.round(producto.precio * 0.8); // 20% menos
        descuentoHTML = `
            <h>
                <span class="text-decoration-line-through text-danger">$${producto.precio.toLocaleString('es-ES')}</span>
                <span class="ms-2 text-success fw-bold">Precio DUOC: $${precioConDescuento.toLocaleString('es-ES')}</span>
            </h>
        `;
        precioFinal = precioConDescuento; // 👈 Se guarda para el carrito
    }
    // Bloque del precio
let precioHTML = esDuoc
    ? `
        <h3>
            <span class="text-decoration-line-through text-danger">
                $${producto.precio.toLocaleString('es-ES')}
            </span>
        </h3>
        <h2>
            <span class="ms-2 text-success fw-bold">
            Precio DUOC: $${precioFinal.toLocaleString('es-ES')}
            </span>
        </h2>
    `
    : `<h2>$${producto.precio.toLocaleString('es-ES')}</h2>`;


    contenedor.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
            </div>
            <div class="col-md-6 text-white">
                <small>${producto.Marca}</small>
                <h1 class="mt-2">${producto.nombre}</h1>
                <p>Código (provisional): ${producto.codigo}</p>
                <p>Material: ${producto.Material}</p>
                <p>${producto.Descripcion}</p>
                
                ${precioHTML}

                <div class="d-flex my-4">
                    <div class="input-group me-3" style="width: 130px;">
                        <button class="btn btn-primary" id="decreaseBtn">-</button>
                        <input type="text" class="form-control text-center" id="quantityInput" value="1">
                        <button class="btn btn-primary" id="increaseBtn">+</button>
                    </div>
                    <button class="btn btn-primary flex-grow-1" id="addToCartBtn">AÑADIR Y VER CARRITO</button>
                </div>

                <div class="d-grid">
                    <button class="btn btn-outline-light" id="addToWishlistBtn">Añadir a la lista de deseos</button>
                </div>
            </div>
        </div>

        <div class="container py-5 text-white">
            <h3 class="text-center mb-4">Deja tu reseña</h3>
            <form id="commentForm">
                <div class="mb-3">
                    <label for="reviewScore" class="form-label">Calificación</label>
                    <select class="form-select" id="reviewScore">
                        <option selected disabled>Elige una puntuación</option>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="commentText" class="form-label">Comentario</label>
                    <textarea class="form-control" id="commentText" rows="4" placeholder="Escribe tu comentario aquí..." required></textarea>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Enviar Reseña</button>
                </div>
            </form>

            <hr class="my-5">
            <h4>Comentarios de los clientes</h4>
            <div id="commentsContainer" class="list-group"></div>
        </div>
    `;

    // Lógica cantidad
    const quantityInput = document.getElementById('quantityInput');
    document.getElementById('increaseBtn').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    document.getElementById('decreaseBtn').addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) quantityInput.value -= 1;
    });

    // Botón añadir al carrito
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        // --- Validar que el usuario este logeado antes de continuar ---
        if (!usuarioLogueado) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            window.location.href = "user_inicio_sesion.html"; // redirige al login
            return;
        }

        const cantidad = parseInt(quantityInput.value);
        agregarAlCarrito({ ...producto, precio: precioFinal }, cantidad);

        // Redirigir a carrito.html
        window.location.href = "carrito.html";
    });

    document.getElementById('addToWishlistBtn').addEventListener('click', () => {
        if (!usuarioLogueado) {
            alert("Debes iniciar sesión para añadir productos a tu lista de deseos.");
            window.location.href = "login.html";
            return;
        }
        alert(`¡${producto.nombre} añadido a la lista de deseos!`);
    });

    // --- Comentarios simulados ---
    const comentariosSimulados = [
        {
            usuario: "María López",
            calificacion: 5,
            texto: "Excelente producto, muy detallado y de gran calidad.",
            fecha: "2025-09-04"
        },
        {
            usuario: "Juan Pérez",
            calificacion: 4,
            texto: "Muy buena figura, aunque el empaque llegó un poco golpeado.",
            fecha: "2025-08-28"
        },
        {
            usuario: "Carla Gutiérrez",
            calificacion: 5,
            texto: "¡Frodo se ve increíble en mi colección!",
            fecha: "2025-09-01"
        }
    ];

    const commentsContainer = document.getElementById('commentsContainer');

    function renderizarComentarios() {
        commentsContainer.innerHTML = '';
        comentariosSimulados.forEach(comentario => {
            const estrellas = '★'.repeat(comentario.calificacion) + '☆'.repeat(5 - comentario.calificacion);
            const commentHtml = `
                <div class="list-group-item list-group-item-dark mb-3 rounded">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 text-warning">${estrellas}</h5>
                        <small>— ${comentario.usuario} (${comentario.fecha})</small>
                    </div>
                    <p class="mb-1">${comentario.texto}</p>
                </div>
            `;
            commentsContainer.innerHTML += commentHtml;
        });
    }

    renderizarComentarios();

    // Manejo de reseñas
    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const score = parseInt(document.getElementById('reviewScore').value);
        const comment = document.getElementById('commentText').value.trim();

        if (!score || comment === "") {
            alert("Por favor, selecciona una puntuación y escribe un comentario.");
            return;
        }
        comentariosSimulados.unshift({
            usuario: usuarioLogueado ? usuarioLogueado.nombre : "Usuario Anónimo",
            calificacion: score,
            texto: comment,
            fecha: new Date().toLocaleDateString('es-CL')
        });

        document.getElementById('commentForm').reset();
        renderizarComentarios();
        alert("¡Tu reseña ha sido enviada!");
    });
}

function agregarAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Ver si ya existe el producto en el carrito
    const index = carrito.findIndex(item => item.codigo === producto.codigo);
    if (index !== -1) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


