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

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const idioma = document.getElementById('language').value.trim().toLowerCase();
    const resultContainer = document.getElementById('resultContainer');

    if (!idioma) {
        resultContainer.innerHTML = '<p style="color:red;">Por favor ingrese un idioma válido.</p>';
        return;
    }

    fetch(`https://p-1-streaming.onrender.com/peliculas_idioma/${idioma}`)
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            resultContainer.innerHTML = `<p style="color:red;">Error al buscar datos: ${error}</p>`;
        });
});


// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Español', 'Inglés', 'Francés', 'Alemán'],
//         datasets: [{
//             label: 'Películas por idioma',
//             data: [120, 200, 80, 45],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(75, 192, 192, 0.6)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Películas por Idioma'
//             }
//         }
//     }
// });


async function cargarDatos() {
    const idiomas = ['es', 'en', 'fr', 'de']; // Español, Inglés, Francés, Alemán
    const etiquetas = ['Español', 'Inglés', 'Francés', 'Alemán'];
    const coloresFondo = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)'
    ];
    const coloresBorde = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
    ];
    
    const datos = [];

    for (let idioma of idiomas) {
        try {
            const respuesta = await  fetch(`https://p-1-streaming.onrender.com/peliculas_idioma/${idioma}`);
            const json = await respuesta.json();
            datos.push(json['Cantidad de pelicula que fueron estrenadas'] || 0);
            console.log("Datos cargados:", datos);
        } catch (error) {
            console.error(`Error al obtener datos para ${idioma}:`, error);
            datos.push(0);
        }
    }
    console.log("Datos cargados:", datos);
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Películas por idioma',
                data: datos,
                backgroundColor: coloresFondo,
                borderColor: coloresBorde,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#000000'
                    }
                },
                title: {
                    display: true,
                    text: 'Películas por Idioma',
                    color: '#000000',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#000000'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#000000'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);
