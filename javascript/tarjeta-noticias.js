async function crearNoticia() {
    // recuperar datos de la bd
    const { data, error } = await window.supabaseClient
            .from('Noticia')
            .select('*')
            .order('fecha', { ascending: false });

    if (error) return;

    const contenedor = document.querySelector("#contenedor-noticias");
    contenedor.className = "row d-flex flex-wrap"; 

    contenedor.innerHTML = data.map(noticia => `
        <div class="col-12 col-sm-6 col-md-4 mb-4" style="display: flex;">
            <div class="card w-100 shadow-sm" style="display: flex; flex-direction: column; overflow: hidden;">
                <img src="${noticia.imagen}" style="width: 100%; height: 200px; object-fit: cover;" alt="Noticia">
                <div class="card-body" style="flex: 1; display: flex; flex-direction: column;">
                    <h5 style="font-weight: bold; margin-bottom: 0.5rem;">${noticia.titulo}</h5>
                    <p style="color: #6c757d; font-size: 0.85rem; margin-bottom: 0.5rem;">${noticia.fecha}</p>
                    
                    <div style="
                        display: -webkit-box !important;
                        -webkit-line-clamp: 3 !important;
                        -webkit-box-orient: vertical !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                        height: 4.5em !important;
                        line-height: 1.5em !important;
                        font-size: 0.95rem;
                    ">
                        ${noticia.contenido}
                    </div>
                </div>
                <button class="btn boton-admin" style="margin: 1rem; align-self: flex-center;" onclick="window.location.href='noticias/${noticia.titulo}' + '.html'">Leer más</button>
            </div>
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", crearNoticia);