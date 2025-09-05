const figuras = [
            {   codigo: "FG001",
                nombre: "Frodo",
                imagen: "../img/productos/IMAGENES_DE_FIGURAS/frodoIMGchetaaPNG.png",
                precio: 29990,
                Marca: "Lord of the Rings Toys",
                Material: "Plastico de calidad",
                Descripcion: "Una figura detallada que captura la valentía y la carga del Portador del Anillo. Ideal para quienes aprecian al héroe más inesperado de la Tierra Media",
                enlace: "#"
            },
            {   codigo: "FG002",
                nombre: "Gandalf",
                imagen: "../img/productos/IMAGENES_DE_FIGURAS/gandaflIMGcheta.png",
                precio: 29990,
                Marca: "Lord of the Rings Toys",
                Material: "Plastico de calidad",
                Descripcion: "Una figura detallada que captura la valentía y la carga del Portador del Anillo. Ideal para quienes aprecian al héroe más inesperado de la Tierra Media",
                enlace: "#"
            }
        ];
// ======================================
// Archivo: venta.js
// Lógica para renderizar la página de un solo producto.
// ======================================

function renderizarPaginaProducto(producto) {
    const contenedorPrincipal = document.getElementById('product-container');
    if (!contenedorPrincipal) return;

    const htmlContenido = `
        <div class="row">
            <div class="col-md-6">
                <div class="position-relative">
                    <img style="width: 500px;" src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                </div>
            </div>

            <div class="col-md-6">
                <small class="text-muted">${producto.Marca}</small>
                <h1 class="mt-2">${producto.nombre}</h1>
                <div class="d-flex align-items-center mb-3 text-muted">
                    <div class="text-lightgray">
                        <p class="text-lightgray">
                            Código: ${producto.codigo} <br>
                            Marca: ${producto.Marca}<br>
                            Material: ${producto.Material}<br>
                            Descripción: ${producto.Descripcion}<br>
                        </p>
                    </div>
                </div>
                <h2 class="price"><span>$${producto.precio.toLocaleString('es-ES')}</span></h2>
                <div class="d-flex my-4">
                    <div class="input-group quantity-control me-3" style="width: 130px;">
                        <button style="background-color: #1E90FF;" class="btn" id="decreaseBtn">-</button>
                        <input type="text" class="form-control text-center" value="1" id="quantityInput">
                        <button style="background-color: #1E90FF;" class="btn" id="increaseBtn">+</button>
                    </div>
                    <button style="background-color: #1E90FF;" class="btn btn-lg flex-grow-1" id="addToCartBtn">AÑADIR</button>
                </div>
                <div class="d-grid gap-2">
                    <button style="background-color: #1E90FF;" class="btn btn-lg" id="addToWishlistBtn">Añadir a la lista de deseos</button>
                </div>
            </div>
        </div>
        <div class="container py-5" style="color: white;">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center mb-4">Deja tu reseña</h3>
                    <form id="commentForm">
                        <div class="mb-3">
                            <label for="reviewScore" class="form-label">Calificación</label>
                            <select class="form-select" id="reviewScore">
                                <option selected>Elige una puntuación</option>
                                <option value="1">1 Estrella</option>
                                <option value="2">2 Estrellas</option>
                                <option value="3">3 Estrellas</option>
                                <option value="4">4 Estrellas</option>
                                <option value="5">5 Estrellas</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="commentText" class="form-label">Comentario</label>
                            <textarea class="form-control" id="commentText" rows="5" placeholder="Escribe tu comentario aquí..." required></textarea>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Enviar Reseña</button>
                        </div>
                    </form>
                </div>
            </div>
            <hr class="my-5">
            <div class="row">
                <div class="col-12">
                    <h4 class="mb-4">Comentarios de los clientes</h4>
                    <div id="commentsContainer" class="list-group">
                        <div class="list-group-item list-group-item-dark mb-3 rounded">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Gran figura de Frodo</h5>
                                <small>5 estrellas</small>
                            </div>
                            <p class="mb-1">¡Me encantó la figura! Los detalles son increíbles y se ve genial en mi colección.</p>
                            <small>— Juan P.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    contenedorPrincipal.innerHTML = htmlContenido;

    // ... (El resto de la lógica para botones y comentarios)
    const quantityInput = document.getElementById('quantityInput');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    
    increaseBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    });

    decreaseBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    addToCartBtn.addEventListener('click', () => {
        console.log(`Se añadió ${quantityInput.value} unidad(es) de ${producto.nombre} al carrito.`);
        alert(`¡${quantityInput.value} unidad(es) de ${producto.nombre} añadidas al carrito!`);
    });

    addToWishlistBtn.addEventListener('click', () => {
        console.log(`Se añadió ${producto.nombre} a la lista de deseos.`);
        alert(`¡${producto.nombre} añadido a la lista de deseos!`);
    });

    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = document.getElementById('reviewScore').value;
        const comment = document.getElementById('commentText').value;
        if (score === "Elige una puntuación" || comment.trim() === "") {
            alert("Por favor, selecciona una puntuación y escribe un comentario.");
            return;
        }
        const newCommentHtml = `
            <div class="list-group-item list-group-item-dark mb-3 rounded">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${score} estrellas</h5>
                    <small>— Usuario Anónimo</small>
                </div>
                <p class="mb-1">${comment}</p>
            </div>
        `;
        commentsContainer.innerHTML += newCommentHtml;
        commentForm.reset();
        alert("¡Tu reseña ha sido enviada!");
    });
}