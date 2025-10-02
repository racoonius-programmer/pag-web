// Base de datos simulada de usuarios
const userDB = [
  {
    id: 1,
    username: "admin",
    correo: "admin@gmail.com",
    contrasena: "admin123",
    fechaNacimiento: "1990-01-01",
    telefono: "123456789",
    direccion: "Av. Principal 100",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "admin",
    descuentoDuoc: false
  },
  {
    id: 2,
    username: "juanito",
    correo: "juanito@duoc.cl",
    contrasena: "juanito123",
    fechaNacimiento: "2000-05-12",
    telefono: "987654321",
    direccion: "Calle Secundaria 45",
    region: "Valparaíso",
    comuna: "Viña del Mar",
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "usuario",
    descuentoDuoc: true
  },
  {
    id: 3,
    username: "maria",
    correo: "maria@gmail.com",
    contrasena: "maria123",
    fechaNacimiento: "1995-09-20",
    telefono: "555555555",
    direccion: "Av. Las Flores 12",
    region: "Región del Biobío",
    comuna: "Concepción",
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "usuario",
    descuentoDuoc: false
  }
];

// Inicializa usuarios en localStorage con id si no existen
if (!localStorage.getItem("usuarios")) {
    const usuariosConId = userDB.map((u, i) => ({ ...u, id: i + 1 }));
    localStorage.setItem("usuarios", JSON.stringify(usuariosConId));


    /* 

    Propósito: guardar los usuarios en localStorage para que puedan persistir mientras se navega la página.

    Primero, verifica si ya existe la clave "usuarios" en localStorage.
    Si no existe, toma cada usuario de userDB y asegura que tenga un id único usando map((u, i) => ({ ...u, id: i + 1 })).
    Convierte el array de usuarios a JSON y lo guarda en localStorage.
    Esto hace que la información de los usuarios esté disponible para todo el sitio, permitiendo funcionalidades como login,
    aplicar descuentos DUOC o mostrar información del perfil.
*/
}
