$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('body,html').animate({
      scrollTop: $(hash).offset().top
      }, 1200, function(){
      window.location.hash = hash;
     });
     } 
    });
});

var width = $(window).width(); 

window.onscroll = function(){
if ((width >= 900)){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#middle").css("background-size","150% auto");
    }else{
        $("#middle").css("background-size","100% auto");        
    }
}
};

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },200);
},300);


$('#searchForm').submit(function(event) {
  event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

  var language = $('#language').val();  // Obtener el idioma ingresado
  var url = `https://pi1-he-dev.onrender.com/peliculas_idioma/${language}`;  // URL de la API con el idioma

  // Verificar si se ingresó un idioma
  if (!language) {
      $('#resultContainer').html('<p style="color:red;">Por favor ingrese un idioma válido.</p>');
      return;
  }

  // Hacer una solicitud GET a la API con el idioma
  fetch(url)
      .then(response => {
          // Verificar si la respuesta es exitosa
          if (!response.ok) {
              throw new Error('No se encontraron datos o hubo un error en la solicitud');
          }
          return response.json();  // Convertir la respuesta a JSON
      })
      .then(data => {
          // Mostrar los resultados en la página
          if (data && data.length > 0) {
              var movieCount = data.length;  // Suponiendo que la respuesta es una lista de películas
              var movieList = "<ul>";

              // Crear una lista de películas
              data.forEach(movie => {
                  movieList += `<li><strong>${movie.title}</strong> (${movie.year})</li>`;
              });
              movieList += "</ul>";

              $('#resultContainer').html(`
                  <p><strong>Cantidad de películas en el idioma "${language}":</strong> ${movieCount}</p>
                  <h4>Lista de películas:</h4>
                  ${movieList}
              `);
          } else {
              $('#resultContainer').html('<p>No se encontraron películas para el idioma ingresado.</p>');
          }
      })
      .catch(error => {
          // Mostrar mensaje de error
          $('#resultContainer').html(`<p style="color:red;">Error: ${error.message}</p>`);
      });
});