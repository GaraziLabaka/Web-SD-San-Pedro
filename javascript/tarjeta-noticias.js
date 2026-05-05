let cargando = false; 

async function obtenerYDibujarNoticias() {
    if (cargando) return; 
    cargando = true;

    const contenedor = document.querySelector("#contenedor-noticias");
    
    const inicio = contenedor.children.length;
    const fin = inicio + 5;
    const { data, error } = await window.supabaseClient
        .from('Noticia')
        .select('*')
        .order('fecha', { ascending: false })
        .range(inicio, fin);

    if (error || !data) {
        cargando = false;
        return;
    }

    // inyectar html
    const nuevasTarjetas = data.map(noticia => `
        <div class="col-12 col-sm-6 col-md-4 mb-4 d-flex">
            <div class="card w-100 shadow-sm d-flex flex-column" style="overflow: hidden;">
                <img src="${noticia.imagen}" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column flex-grow-1">
                    <h5 class="fw-bold">${noticia.titulo}</h5>
                    <p class="text-muted small">${noticia.fecha}</p>
                    <div style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 4.5em; line-height: 1.5em;">
                        ${noticia.contenido}
                    </div>
                </div>
                <button class="btn boton-admin m-3" onclick="location.href='detalle-noticia.html?id=${noticia.id}'">
                    Leer más
                </button>
            </div>
        </div>
    `).join('');

    // Agregar las nuevas tarjetas al contenedor sin borrar lo viejo
    contenedor.insertAdjacentHTML('beforeend', nuevasTarjetas);

    cargando = false;
}

// detectar scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        obtenerYDibujarNoticias();
    }
});

document.addEventListener("DOMContentLoaded", obtenerYDibujarNoticias);