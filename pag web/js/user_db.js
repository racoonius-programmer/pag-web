// Base de datos simulada de usuarios
const userDB = [
  {
    id: 1,
    username: "admin",
    correo: "admin@ejemplo.com",
    contrasena: "admin123",
    fechaNacimiento: "1990-01-01",
    telefono: "123456789",
    direccion: "Av. Principal 100",
    region: 1,
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "admin",
    descuentoDuoc: false
  },
  {
    id: 2,
    username: "juanito",
    correo: "juanito@duocuc.cl",
    contrasena: "juanito123",
    fechaNacimiento: "2000-05-12",
    telefono: "987654321",
    direccion: "Calle Secundaria 45",
    region: 5,
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "usuario",
    descuentoDuoc: true
  },
  {
    id: 3,
    username: "maria",
    correo: "maria@example.com",
    contrasena: "maria123",
    fechaNacimiento: "1995-09-20",
    telefono: "555555555",
    direccion: "Av. Las Flores 12",
    region: 8,
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "usuario",
    descuentoDuoc: false
  }
];

// Inicializa usuarios en localStorage con id si no existen
// Esto fue para evitar un error en el que se desincronizaba la lista de usuarios con el usuario actual
if (!localStorage.getItem("usuarios")) {
    const usuariosConId = userDB.map((u, i) => ({ ...u, id: i + 1 }));
    localStorage.setItem("usuarios", JSON.stringify(usuariosConId));
}
