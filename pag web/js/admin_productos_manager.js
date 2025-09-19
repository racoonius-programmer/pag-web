document.addEventListener("DOMContentLoaded", () => {
    let productos = JSON.parse(localStorage.getItem("todosLosProductos"));
    if (!productos || productos.length === 0) {
        productos = [...todosLosProductos];
        localStorage.setItem("todosLosProductos", JSON.stringify(productos));
    }

    // Lógica para el botón de regreso
    document.getElementById("returnToAdmin").addEventListener("click", () => {
        window.location.href = "admin_main.html";
    });

    const listaProductos = document.getElementById("listaProductos");
    const cantidadProductos = document.getElementById("cantidadProductos");
    const previewPlaceholder = document.getElementById("previewPlaceholder");
    let productoSeleccionadoIndex = -1;

    const codigo = document.getElementById("codigo");
    const nombre = document.getElementById("nombre");
    const Descripcion = document.getElementById("Descripcion");
    const precio = document.getElementById("precio");
    const stock = document.getElementById("stock"); // Nuevo
    const stockCritico = document.getElementById("stockCritico"); // Nuevo
    const stockCriticoAlert = document.getElementById("stockCriticoAlert"); // Nuevo
    const fabricante = document.getElementById("fabricante");
    const distribuidor = document.getElementById("distribuidor");
    const Marca = document.getElementById("Marca");
    const Material = document.getElementById("Material");
    const imagen = document.getElementById("imagen");
    const previewImagen = document.getElementById("previewImagen");

    // Función para verificar el stock crítico y mostrar la alerta
    function verificarStockCritico(p) {
        stockCriticoAlert.textContent = "";
        stockCriticoAlert.classList.remove("text-warning");

        if (p.stockCritico !== null && p.stock <= p.stockCritico) {
            stockCriticoAlert.textContent = "¡ALERTA! Stock crítico.";
            stockCriticoAlert.classList.add("text-warning");
        }
    }

    function actualizarCantidad() {
        cantidadProductos.textContent = `Productos registrados: ${productos.length}`;
    }

    function refrescarLista() {
        listaProductos.innerHTML = productos.map((p, i) =>
            `<tr data-index="${i}">
                <td>${p.codigo}</td>
                <td>${p.nombre}</td>
            </tr>`
        ).join('');
        actualizarCantidad();
    }

    function cargarProducto(index) {
        const p = productos[index];
        if (!p) return;
        codigo.value = p.codigo || "";
        nombre.value = p.nombre || "";
        Descripcion.value = p.Descripcion || "";
        precio.value = p.precio || 0;
        stock.value = p.stock || 0; // Cargar valor de stock
        stockCritico.value = p.stockCritico || ""; // Cargar valor de stock crítico
        fabricante.value = p.fabricante || "";
        distribuidor.value = p.distribuidor || "";
        Marca.value = p.Marca || "";
        Material.value = p.Material || "";
        imagen.value = p.imagen || "";
        previewImagen.src = p.imagen || "";

        if (p.imagen) {
            previewImagen.style.display = "block";
            previewPlaceholder.style.display = "none";
        } else {
            previewImagen.style.display = "none";
            previewPlaceholder.style.display = "block";
        }

        verificarStockCritico(p);
    }

    function guardarProductos() {
        localStorage.setItem("todosLosProductos", JSON.stringify(productos));
    }

    // Evento para el campo de imagen
    imagen.addEventListener("input", () => {
        previewImagen.src = imagen.value;
        if (imagen.value) {
            previewImagen.style.display = "block";
            previewPlaceholder.style.display = "none";
        } else {
            previewImagen.style.display = "none";
            previewPlaceholder.style.display = "block";
        }
    });

    // Evento para el campo de stock
    stock.addEventListener("input", () => {
        const p = productos[productoSeleccionadoIndex];
        if (p) {
            p.stock = parseInt(stock.value);
            verificarStockCritico(p);
        }
    });

    // Evento para el campo de stock crítico
    stockCritico.addEventListener("input", () => {
        const p = productos[productoSeleccionadoIndex];
        if (p) {
            p.stockCritico = parseInt(stockCritico.value) || null;
            verificarStockCritico(p);
        }
    });

    document.getElementById("guardarCambios").addEventListener("click", () => {
        if (productoSeleccionadoIndex === -1) {
            alert("Selecciona un producto para guardar cambios.");
            return;
        }

        const index = productoSeleccionadoIndex;
        if (productos[index]) {
            // Validaciones
            if (stock.value === "" || parseInt(stock.value) < 0) {
                alert("El stock es un campo requerido y debe ser un número mayor o igual a 0.");
                return;
            }

            // Guardar valores
            productos[index].nombre = nombre.value;
            productos[index].Descripcion = Descripcion.value;
            productos[index].precio = parseFloat(precio.value) || 0;
            productos[index].stock = parseInt(stock.value); // Guardar stock
            productos[index].stockCritico = parseInt(stockCritico.value) || null; // Guardar stock crítico
            productos[index].fabricante = fabricante.value;
            productos[index].distribuidor = distribuidor.value;
            productos[index].Marca = Marca.value;
            productos[index].Material = Material.value;
            productos[index].imagen = imagen.value;
            
            guardarProductos();
            alert("Cambios guardados en producto: " + productos[index].nombre);
            refrescarLista();
            seleccionarFila(index);
        }
    });

    document.getElementById("agregarNuevo").addEventListener("click", () => {
        const nuevo = {
            codigo: "NEW" + (productos.length + 1),
            nombre: "Nuevo Producto",
            Descripcion: "",
            precio: 0,
            stock: 0, // Valor inicial de stock
            stockCritico: null, // Valor inicial de stock crítico
            fabricante: "",
            distribuidor: "",
            Marca: "",
            Material: "",
            imagen: "",
            enlace: "#"
        };
        productos.push(nuevo);
        guardarProductos();
        refrescarLista();
        const nuevoIndex = productos.length - 1;
        cargarProducto(nuevoIndex);
        seleccionarFila(nuevoIndex);
    });

    document.getElementById("eliminarProducto").addEventListener("click", () => {
        if (productoSeleccionadoIndex === -1) {
            alert("Selecciona un producto para eliminar.");
            return;
        }
        const index = productoSeleccionadoIndex;
        if (productos[index] && confirm("¿Eliminar producto: " + productos[index].nombre + "?")) {
            productos.splice(index, 1);
            guardarProductos();
            refrescarLista();
            if (productos.length > 0) {
                cargarProducto(0);
                seleccionarFila(0);
            } else {
                document.getElementById("productoForm").reset();
                previewImagen.style.display = "none";
                previewPlaceholder.style.display = "block";
                productoSeleccionadoIndex = -1;
            }
        }
    });

    // Lógica para seleccionar filas
    function seleccionarFila(index) {
        if (listaProductos.children.length > 0) {
            for (let i = 0; i < listaProductos.children.length; i++) {
                listaProductos.children[i].classList.remove('active-row');
            }
            if (listaProductos.children[index]) {
                listaProductos.children[index].classList.add('active-row');
            }
            productoSeleccionadoIndex = index;
        }
    }

    listaProductos.addEventListener("click", (e) => {
        let row = e.target.closest('tr');
        if (row) {
            const index = row.dataset.index;
            cargarProducto(index);
            seleccionarFila(index);
        }
    });

    // Inicialización
    refrescarLista();
    if (productos.length > 0) {
        cargarProducto(0);
        seleccionarFila(0);
    }
});