document.addEventListener("DOMContentLoaded", async function () {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return;


    console.log("Solicitando datos a Supabase antes de crear la tabla...");
    const { data, error } = await window.supabaseClient
        .from('Noticia')
        .select('*');

    if (error) {
        console.error("Error al obtener datos:", error);
        wrapper.innerHTML = `<div class="alert alert-danger">Error al cargar datos: ${error.message}</div>`;
        return;
    }


    const datosFormateados = data.map(n => [
        typeof n.imagen === 'object' ? 'Sin imagen' : (n.imagen || ''),
        n.titulo || 'Sin título',
        n.fecha || '',
        n.contenido || '',
        ''
    ]);

    console.log("Datos listos para Grid.js:", datosFormateados);


    new gridjs.Grid({
        columns: [
            {
                name: "Imagen",
                formatter: (cell) => {
                    if (!cell || cell === 'Sin imagen' || cell.includes('fakepath')) {
                        return gridjs.html(`<span style="color:red; font-size:10px;">URL Inválida</span>`);
                    }

                    return gridjs.html(`
            <div style="text-align:center;">
                <img src="${cell}" 
                     style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;"
                     onload="console.log('Imagen cargada ok')"
                     onerror="this.parentElement.innerHTML='<small style=color:orange>Error 403/404</small>'">
            </div>
        `);
                }
            },
            "Título",
            "Fecha",
            {
                name: "Contenido",
                formatter: (cell) => {
                    return gridjs.html(`<div style="max-height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px;">${cell}</div>`);
                }
            },
            {
                name: 'Acciones',
                formatter: (cell, row) => {
                    const id = row.cells[0].data;
                    return gridjs.html(`
                        <div class="d-flex gap-2">
                            <button class="btn boton-editar btn-sm" onclick="editarNoticia('${titulo}')">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="btn boton-borrar btn-sm" onclick="borrarNoticia('${id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    `);
                }
            }
        ],
        data: datosFormateados,
        search: true,
        pagination: { limit: 5 },
        resizable: true,
        className: { table: 'table table-hover' },
        language: {
            'search': { 'placeholder': 'Buscar noticia...' },
            'noRecordsFound': 'No hay noticias en la base de datos'
        }
    }).render(wrapper);

    // lógica para el botón de publicar
    boton.addEventListener("click", async () => {
        const fotoInput = document.getElementById("imagen-noticia");
        const fotoArchivo = fotoInput.files[0];
        const titulo = document.getElementById("titulo-noticia").value;
        const fecha = document.getElementById("fecha-noticia").value;
        const contenido = document.getElementById("contenido-noticia").value;

        if (!fotoArchivo) return alert("Selecciona una imagen primero");

        try {
            const nombreArchivo = `${Date.now()}_${fotoArchivo.name.replace(/\s+/g, '_')}`;
            console.log("Subiendo archivo:", nombreArchivo);
            const { data: uploadData, error: uploadError } = await window.supabaseClient
                .storage
                .from('imagenes-noticias')
                .upload(nombreArchivo, fotoArchivo);

            if (uploadError) {
                console.error("Error en Storage:", uploadError);
                throw new Error("No se pudo subir la foto al Storage: " + uploadError.message);
            }

            // obtener la url de supabase
            const { data: urlData } = window.supabaseClient
                .storage
                .from('imagenes-noticias')
                .getPublicUrl(nombreArchivo);

            if (!urlData || !urlData.publicUrl) {
                throw new Error("Supabase no devolvió una URL válida");
            }

            const urlFinal = urlData.publicUrl;
            console.log("URL generada con éxito:", urlFinal);

            // insertar en la tabla
            const { error: insertError } = await window.supabaseClient
                .from('Noticia')
                .insert([{
                    titulo: titulo,
                    fecha: fecha,
                    contenido: contenido,
                    imagen: urlFinal
                }]);

            if (insertError) throw insertError;

            alert("¡Publicado correctamente!");
            alert("¡Noticia publicada con éxito!");
            setTimeout(() => {
                location.reload();
            }, 500);
            location.reload();

        } catch (err) {
            console.error("ERROR COMPLETO:", err);
            alert("ALERTA DE ERROR: " + err.message);
        }
    })
});

window.borrarNoticia = async (id) => {

    try {
        const { error } = await window.supabaseClient
            .from('Noticia')
            .delete()
            .eq('id', id);

        if (error) throw error;
        location.reload();

    } catch (err) {
        console.error("Error al eliminar noticia:", err);
        alert("Error al eliminar noticia: " + err.message);
    }
};