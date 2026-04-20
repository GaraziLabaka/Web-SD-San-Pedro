import { USUARIO, PASSWORD } from '../logininfo.js';

document.addEventListener("DOMContentLoaded", () => {
    var boton = document.querySelector(".boton-admin");
    boton.addEventListener("click", function() {
        if (boton) {
            
            const userVal = document.getElementById("usuario").value;
            const passVal = document.getElementById("password").value;

            if (userVal === USUARIO && passVal === PASSWORD) {
                
                window.location.href = "admin.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        }
    })});