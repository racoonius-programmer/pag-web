//Genera automaticamente la producto-detalles.html sacando los datos del producto
function renderizarPaginaProducto(producto) {
    const contenedor = document.getElementById('product-container');
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
            </div>
            <div class="col-md-6 text-white">
                <small >${producto.Marca}</small>
                <h1 class="mt-2">${producto.nombre}</h1>
                <p>Código (provisional): ${producto.codigo}</p>
                <p>Material: ${producto.Material}</p>
                <p>${producto.Descripcion}</p>
                <h2>$${producto.precio.toLocaleString('es-ES')}</h2>

                <div class="d-flex my-4">
                    <div class="input-group me-3" style="width: 130px;">
                        <button class="btn btn-primary" id="decreaseBtn">-</button>
                        <input type="text" class="form-control text-center" id="quantityInput" value="1">
                        <button class="btn btn-primary" id="increaseBtn">+</button>
                    </div>
                    <button class="btn btn-primary flex-grow-1" id="addToCartBtn">AÑADIR</button>
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

    // Botones
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        alert(`¡${quantityInput.value} unidad(es) de ${producto.nombre} añadidas al carrito!`);
    });
    document.getElementById('addToWishlistBtn').addEventListener('click', () => {
        alert(`¡${producto.nombre} añadido a la lista de deseos!`);
    });

    // Comentarios simulados para testear
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

    // Función para renderizar comentarios
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

    // Manejar envío de nuevo comentario
    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const score = parseInt(document.getElementById('reviewScore').value);
        const comment = document.getElementById('commentText').value.trim();

        if (!score || comment === "") {
            alert("Por favor, selecciona una puntuación y escribe un comentario.");
            return;
        }
        //Por ahora manejaremos nuestro usuario como anónimo
        comentariosSimulados.unshift({
            usuario: "Usuario Anónimo",
            calificacion: score,
            texto: comment,
            fecha: new Date().toLocaleDateString('es-CL')
        });

        document.getElementById('commentForm').reset();
        renderizarComentarios();
        alert("¡Tu reseña ha sido enviada!");
    });
}
