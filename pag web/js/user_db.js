// js/user_db.js
// Simulación en memoria de la base de usuarios.
// NOTA: este archivo define `userDB` en memoria (no toca localStorage).
// Si usas un script que inicializa localStorage (simulacion-bd.js), añade la misma propiedad allí.

const userDB = [
  {
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
    username: "juanito",
    correo: "juanito@duocuc.cl",
    contrasena: "juanito123",
    fechaNacimiento: "2000-05-12",
    telefono: "987654321",
    direccion: "Calle Secundaria 45",
    region: 5,
    fotoPerfil: "img/header/user-logo-generic-white-alt.png",
    rol: "usuario",
    descuentoDuoc: true   // <-- usuario con correo Duoc
  },
  {
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
