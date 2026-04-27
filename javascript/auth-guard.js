// javascript/auth-guard.js

async function checkAccess() {
    if (!window.supabaseClient) {
        window.location.href = "login.html";
        return;
    }

    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    if (error || !session) {
        document.body.style.display = "none";
        window.location.href = "login.html";
    } else {
        document.body.style.display = "block";
        console.log("Bienvenido, administrador:", session.user.email);
    }
}

checkAccess();