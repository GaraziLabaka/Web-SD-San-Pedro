function publicarNoticias() {
    var boton = document.getElementById("publicar-noticia");
    var titulo = document.getElementById("titulo-noticia").value;
    var fecha = document.getElementById("fecha-noticia").value;
    var contenido = document.getElementById("contenido-noticia").value;
    var imagen = document.getElementById("contenido-noticia").files[0];

    boton.addEventListener("click", function() {
        if(titulo && fecha && contenido) {
            

}})}