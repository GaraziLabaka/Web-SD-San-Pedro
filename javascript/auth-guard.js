async function verificarAcceso() {
    console.log("Verificando sesión...");

    if (!window.supabaseClient) {
        console.error("Supabase no está configurado.");
        window.location.href = "login.html";
        return;
    }

    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    if (error || !session) {
        console.warn("Acceso denegado. Redirigiendo al login...");
        window.location.href = "login.html";
    } else {
        console.log("Acceso concedido para:", session.user.email);
        
        
        if (document.body) {
            document.body.style.display = "block";
        } else {
            document.addEventListener("DOMContentLoaded", () => {
                document.body.style.display = "block";
            });
        }
    }
}

verificarAcceso();