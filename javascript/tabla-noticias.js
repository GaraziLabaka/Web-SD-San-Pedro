document.addEventListener("DOMContentLoaded", function() {
    new gridjs.Grid({
        
        columns: [
            "Imagen", 
            "Título", 
            "Fecha", 
            "Contenido",
            { 
                name: 'Acciones', 
                formatter: (cell, row) => {
                    // gridjs.html inyecta el HTML de los botones con iconos
                    return gridjs.html(`
                        <div class="d-flex gap-2">
                            <button class="btn btn-success btn-sm" onclick="editarNoticia('${row.cells[1].data}')" title="Editar">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="borrarNoticia('${row.cells[1].data}')" title="Borrar">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    `);
                }
            }
        ],
        autoWidth: true, 
        search: true, 
        resizable: true, 
        pagination: { limit: 5 }, 
        language: {
            'search': { 'placeholder': 'Buscar noticia...' },
            'noRecordsFound': 'No hay noticias publicadas',
            'pagination': {
                'previous': 'Anterior',
                'next': 'Siguiente',
                'showing': 'Mostrando',
                'results': () => 'registros'
            }
        },
        data: [
            ["📷", "Victoria del San Pedro", "20/10/2023", "Resumen del partido..."],
            ["📷", "Entrenamiento lunes", "21/10/2023", "Horarios actualizados..."]
        ],
        style: {
            table: { 'font-size': '14px' }
        },
        className: {
            table: 'table table-hover' 
        }
    }).render(document.getElementById("wrapper"));
});


function editarNoticia(titulo) {
    
}

function borrarNoticia(titulo) {
    if(confirm("¿Estás seguro de borrar: " + titulo + "?")) {
        // Lógica de borrado aquí
    }
}
