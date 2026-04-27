document.addEventListener("DOMContentLoaded", function() {

    // configurar tabla
    const grid = new gridjs.Grid({
        columns: [
            "Imagen", 
            "Título", 
            "Fecha", 
            "Contenido",
            { 
                name: 'Acciones', 
                formatter: (cell, row) => {
                    return gridjs.html(`
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="editarNoticia('${row.cells[1].data}')" title="Editar">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="borrarNoticia('${row.cells[1].data}')" title="Borrar">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    `);
                }
            }
        ],
        // cargar datos desde supabase
        server: {
            data: async () => {
                const { data, error } = await window.supabaseClient
                    .from('Noticia')
                    .select('*');
                if (error) {
                    console.error("Error cargando datos:", error);
                    return [];
                }
                return data.map(n => [n.imagen, n.titulo, n.fecha, n.contenido]);
            }
        },
        search: true,
        pagination: { limit: 5 },
        resizable: true,
        language: {
            'search': { 'placeholder': 'Buscar noticia...' },
            'noRecordsFound': 'No hay noticias publicadas',
            'pagination': {
                'previous': 'Anterior',
                'next': 'Siguiente'
            }
        },
        className: { table: 'table table-hover' }
    }).render(document.getElementById("wrapper"));

    // botón publicar
    const boton = document.getElementById("publicar-noticia");
    if (boton) {
        boton.addEventListener("click", async () => {
            const nuevaNoticia = {
                titulo: document.getElementById("titulo-noticia").value,
                fecha: document.getElementById("fecha-noticia").value,
                contenido: document.getElementById("contenido-noticia").value,
                imagen: { 
    name: "Imagen", 
    formatter: (cell) => gridjs.html(`<img src="${cell}" style="width:50px; border-radius:5px;">`) 
},
            };

            const { error } = await window.supabaseClient
                .from('Noticia')
                .insert([nuevaNoticia]);

            if (error) {
                alert("Error al guardar: " + error.message);
            } else {
                alert("¡Noticia guardada!");
                location.reload(); 
            }
        });
    }
});

async function borrarNoticia(titulo) {
    if(confirm("¿Estás seguro de borrar: " + titulo + "?")) {
        const { error } = await window.supabaseClient
            .from('Noticia')
            .delete()
            .eq('titulo', titulo);

        if (error) {
            alert("No se pudo borrar: " + error.message);
        } else {
            alert("Noticia eliminada");
            location.reload();
        }
    }
}

function editarNoticia(titulo) {
    console.log("Editando noticia:", titulo);
   
}