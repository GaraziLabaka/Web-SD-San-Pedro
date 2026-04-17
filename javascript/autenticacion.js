import './infologin.config';
 
 // Obtener los valores de usuario y contraseña
const usuario = document.getElementById('usuario').value;
const contrasena = document.getElementById('contrasena').value;

function autenticarAdmin() {
   
    if (usuario === USUARIO && contrasena === PASSWORD) {
        // Redirigir a la página de administración
        window.location.href = 'admin.html';
    } else if (usuario == null && contrasena == null || usuario.trim() === '' && contrasena.trim() === '') {
        // Mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }


}