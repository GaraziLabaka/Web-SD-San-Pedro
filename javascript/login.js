document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector(".boton-admin");

    boton.addEventListener("click", async () => {
        const URL = "https://api.jsonbin.io/v3/b/69e62f24aaba8821971b8486";

        try {
            const response = await fetch(URL);
            
            if (!response.ok) throw new Error("No se pudo conectar con el servidor");

            const data = await response.json();
            
            const claves = data.record; 

            const userVal = document.getElementById("usuario").value;
            const passVal = document.getElementById("password").value;

            if (userVal === claves.USUARIO && passVal === claves.PASSWORD) {
                window.location.href = "admin.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            alert("Error de conexión. Inténtalo más tarde.");
        }
    });
});