document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector(".boton-admin");

    boton.addEventListener("click", async () => {
        const userVal = document.getElementById("usuario").value;
        const passVal = document.getElementById("password").value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userVal, 
                password: passVal,
            });

            if (error) {
                alert("Acceso denegado: " + error.message);
            } else {
                window.location.href = "admin.html";
            }

        } catch (error) {
            alert("Error crítico de conexión.");
        }
    });
});