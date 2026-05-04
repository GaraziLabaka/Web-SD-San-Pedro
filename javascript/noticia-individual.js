async function crearNoticia() {
    // extraer el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("No se encontró ningún ID en la URL");
        return;
    }

    // obtener los datos de Supabase 
    const { data: noticia, error } = await window.supabaseClient
            .from('Noticia')
            .select('*')
            .eq('id', id)
            .single();

    if (error) {
        console.error("Error al obtener la noticia:", error);
        return;
    }

    const contenedor = document.querySelector("#contenedor-noticia-individual");
    
    if (noticia) {
        contenedor.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <h2 class="text-start">${noticia.titulo}</h2>
                <img class="img-fluid mb-4" src="${noticia.imagen}" alt="${noticia.titulo}" 
                     style="width: 25%; height: 25%; align-self: center;" />
                <p class="text-start"><small class="text-muted">${noticia.fecha}</small></p>
                <div class="text-justify">${noticia.contenido}</div>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", crearNoticia);