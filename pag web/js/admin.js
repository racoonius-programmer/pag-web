//ADMINISTRACIÓN DE USUARIOS
document.addEventListener("DOMContentLoaded", () => {
  // Lógica de datos simulada y funcional
  let usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
  const correosExistentes = new Set(usuariosLocal.map(u => u.correo));
  userDB.forEach(u => {
    if (!correosExistentes.has(u.correo)) {
      usuariosLocal.push(u);
    }
  });
  localStorage.setItem("usuarios", JSON.stringify(usuariosLocal));
  let usuarios = usuariosLocal;

  // Elementos del DOM
  const listaUsuarios = document.getElementById("listaUsuarios");
  const cantidadUsuarios = document.getElementById("cantidadUsuarios");
  const userSearch = document.getElementById("userSearch");
  const usuarioForm = document.getElementById("usuarioForm");
  const profilePic = document.getElementById("profilePic");
  const userNameCard = document.getElementById("userNameCard");
  const userEmailCard = document.getElementById("userEmailCard");
  const toggleContrasena = document.getElementById("toggleContrasena");

  // Inputs del formulario
  const username = document.getElementById("username");
  const correo = document.getElementById("correo");
  const contrasena = document.getElementById("contrasena");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  const rol = document.getElementById("rol");
  const descuentoDuoc = document.getElementById("descuentoDuoc");
  const elegirRegion = document.getElementById("elegirRegion");
  const elegirComuna = document.getElementById("elegirComuna");

  let usuarioActualIndex = -1;
  let regionesData = [];

  // Cargar regiones y comunas desde el JSON
  async function cargarRegionesYComunas() {
    try {
      const res = await fetch("json/comunas-regiones.json");
      regionesData = await res.json();
      
      elegirRegion.innerHTML = `<option value="">-- Seleccionar Región --</option>`;
      regionesData.regiones.forEach(r => {
        elegirRegion.innerHTML += `<option value="${r.region}">${r.region}</option>`;
      });

      elegirRegion.addEventListener("change", () => {
        const regionSeleccionada = elegirRegion.value;
        elegirComuna.innerHTML = `<option value="">-- Seleccionar Comuna --</option>`;
        elegirComuna.disabled = true;

        if (regionSeleccionada !== "") {
          const regionObj = regionesData.regiones.find(r => r.region === regionSeleccionada);
          if (regionObj) {
            regionObj.comunas.forEach(comuna => {
              elegirComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
            });
            elegirComuna.disabled = false;
          }
        }
      });
    } catch (error) {
      console.error("Error cargando comunas-regiones:", error);
    }
  }

  // Función para renderizar la lista de usuarios
  function renderizarUsuarios(lista) {
    listaUsuarios.innerHTML = lista.map((u, i) => `
      <li data-index="${u.originalIndex || i}" class="${(u.originalIndex || i) === usuarioActualIndex ? 'active' : ''}">
        <img src="https://ui-avatars.com/api/?name=${u.username}&background=random&color=fff" alt="Foto de perfil">
        <div class="user-details">
          <h5>${u.username}</h5>
          <p class="text-light">${u.correo}</p>
        </div>
      </li>
    `).join("");
    cantidadUsuarios.textContent = `${usuarios.length} usuarios registrados`;
  }

  // Cargar datos de un usuario en el formulario
  function cargarUsuario(index) {
    if (index === -1) {
      usuarioForm.reset();
      profilePic.src = "https://via.placeholder.com/150/505559/FFFFFF/?text=Nuevo";
      userNameCard.textContent = "Nuevo Usuario";
      userEmailCard.textContent = "Complete los datos";
      correo.disabled = false;
      usuarioActualIndex = -1;
      elegirRegion.value = "";
      elegirComuna.innerHTML = `<option value="">-- Seleccionar Comuna --</option>`;
      elegirComuna.disabled = true;
      return;
    }
    
    const u = usuarios[index];
    if (!u) return;

    usuarioActualIndex = index;
    
    // Rellenar formulario
    username.value = u.username || "";
    correo.value = u.correo || "";
    contrasena.value = u.contrasena || "";
    fechaNacimiento.value = u.fechaNacimiento || "";
    telefono.value = u.telefono || "";
    direccion.value = u.direccion || "";
    rol.value = u.rol || "usuario";
    descuentoDuoc.checked = u.descuentoDuoc || false;
    correo.disabled = true;
    
    elegirRegion.value = u.region || "";
    if (u.region) {
      const regionObj = regionesData.regiones.find(r => r.region === u.region);
      if (regionObj) {
        elegirComuna.innerHTML = `<option value="">-- Seleccionar Comuna --</option>`;
        regionObj.comunas.forEach(comuna => {
          elegirComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });
        elegirComuna.disabled = false;
        elegirComuna.value = u.comuna || "";
      }
    }
    
    // Actualizar tarjeta del encabezado
    profilePic.src = `https://ui-avatars.com/api/?name=${u.username}&background=random&color=fff`;
    userNameCard.textContent = u.username;
    userEmailCard.textContent = u.correo;

    document.querySelectorAll('.user-list li').forEach(li => {
      li.classList.remove('active');
      if (parseInt(li.dataset.index) === index) {
        li.classList.add('active');
      }
    });
  }

  // Manejar eventos
  listaUsuarios.addEventListener("click", (e) => {
    const li = e.target.closest('li');
    if (li) {
      const index = parseInt(li.dataset.index);
      cargarUsuario(index);
    }
  });
  
  userSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = usuarios
      .map((user, index) => ({...user, originalIndex: index}))
      .filter(u => 
        u.username.toLowerCase().includes(searchTerm) || 
        u.correo.toLowerCase().includes(searchTerm)
      );
    renderizarUsuarios(filteredUsers);
    
    if (!filteredUsers.some(u => u.originalIndex === usuarioActualIndex)) {
      cargarUsuario(-1);
    }
  });

  document.getElementById("agregarUsuario").addEventListener("click", () => {
    cargarUsuario(-1);
    document.querySelectorAll('.user-list li').forEach(li => li.classList.remove('active'));
    alert("Formulario listo para agregar un nuevo usuario.");
  });

  document.getElementById("guardarCambios").addEventListener("click", () => {
    if (usuarioActualIndex !== -1) {
      usuarios[usuarioActualIndex].username = username.value;
      usuarios[usuarioActualIndex].fechaNacimiento = fechaNacimiento.value;
      usuarios[usuarioActualIndex].telefono = telefono.value;
      usuarios[usuarioActualIndex].direccion = direccion.value;
      usuarios[usuarioActualIndex].rol = rol.value;
      usuarios[usuarioActualIndex].descuentoDuoc = descuentoDuoc.checked;
      usuarios[usuarioActualIndex].region = elegirRegion.value;
      usuarios[usuarioActualIndex].comuna = elegirComuna.value;
      
      alert("Cambios guardados para " + usuarios[usuarioActualIndex].username);
    } else {
      const nuevoUsuario = {
        id: usuarios.length + 1,
        username: username.value,
        correo: correo.value,
        contrasena: contrasena.value,
        fechaNacimiento: fechaNacimiento.value,
        telefono: telefono.value,
        direccion: direccion.value,
        region: elegirRegion.value,
        comuna: elegirComuna.value,
        rol: rol.value,
        descuentoDuoc: descuentoDuoc.checked,
      };
      usuarios.push(nuevoUsuario);
      alert("¡Usuario " + nuevoUsuario.username + " creado con éxito!");
      usuarioActualIndex = usuarios.length - 1;
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderizarUsuarios(usuarios);
    cargarUsuario(usuarioActualIndex);
  });

  toggleContrasena.addEventListener("click", () => {
    if (contrasena.type === "password") {
      contrasena.type = "text";
      toggleContrasena.innerHTML = `<i class="bi bi-eye-slash-fill"></i>`;
    } else {
      contrasena.type = "password";
      toggleContrasena.innerHTML = `<i class="bi bi-eye-fill"></i>`;
    }
  });

  // Inicializar
  cargarRegionesYComunas().then(() => {
    renderizarUsuarios(usuarios);
    if (usuarios.length > 0) {
      cargarUsuario(0);
    } else {
      cargarUsuario(-1);
    }
  });
});