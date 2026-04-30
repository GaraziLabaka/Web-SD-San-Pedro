async function crearNoticia() {
    // obtener los datos de Supabase
    const { data, error } = await window.supabaseClient
            .from('Noticia')
            .select('*')
            .eq('id', id)
            .single();

    if (error) {
        console.error("Error al obtener noticias:", error);
        return;
    }

    const contenedor = document.querySelector("#contenedor-noticia-individual");
    
    if (data) {
        contenedor.innerHTML = data.map(noticia => `
            <div class="container-fluid">
                <h2 class="text-start">${noticia.titulo}</h2>
                <img class="img-fluid mb-4" src="${noticia.imagen}" alt="${noticia.titulo}" style="width: 100%; height: auto; object-fit: cover;" />
                <p class="text-start"><small class="text-muted">${noticia.fecha}</small></p>
                <p class="text-justify">${noticia.contenido}</p>
            </div>
        `).join('');
    }
}


async function generarLink(id) {
    const { data, error } = await window.supabaseClient
        .from('Noticia')
        .select('id')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error al generar el link:", error);
        return null;
    }

    return data ? `noticias/${data.titulo}.html` : null;

}   
document.addEventListener("DOMContentLoaded", crearNoticia);