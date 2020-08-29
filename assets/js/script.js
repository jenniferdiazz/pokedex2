var personajes_agregados_arr=[];
$(function () {
    $("#buscar").click(e=> { 
        BuscarPersonaje();
    });
    $("#limpiar").click(e=> { 
        limpiar();
    });
    $(document).keypress(e=> {
        if(e.which==13){
            BuscarPersonaje(); 
        } 
           
    });

});
function getPersonaje(id){
    $.ajax({
        type: "GET",
        //url: `https://rickandmortyapi.com/api/character/${id}`,
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        
        success: function (response) {
            //console.log(response);
            
            $("#card").append(generarCard(response));
            generarGrafico(response);
        }
    });
}
function generarCard(personaje){
    var card = `
  <div class="col-sm-12 col-md-4">
    <div class="card" style="width:100%;">
      <img src="${personaje.sprites.front_default}" class="card-img-top img-fluid" alt="...">
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <div>Status : ${personaje.height}</div>
        <div>Especie : ${personaje.weight}</div>
        
      </div>
    </div>
  </div>
  `
  return card;
}
function validacion(id){
    var expresion = /^\d{1,3}$/;
  
  if(!expresion.test(id)){
    alert("ID invalido");
    $("input_busqueda").focus();
    return false
}
    return true;
}
function BuscarPersonaje(){
    var id_personaje=$("#input_busqueda").val();
        if(validacion(id_personaje)){
            getPersonaje(id_personaje);
            $("#input_busqueda").val("");
            $("#input_busqueda").focus();
        }
}
function limpiar(){
    $("#card").empty();
    $("#input_busqueda").focus();
}
function generarGrafico(personaje){
    addPersonajeList(personaje);
    var options={
      title:{
        text: `Base Experience:`
      },
      data: [
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        dataPoints: [
        
          ...personajes_agregados_arr,
        ]
      }
      ]
    };
    
  $("#grafico").CanvasJSChart(options);
}
function addPersonajeList(personaje){
  var new_personaje={
    id:personaje.id,
    label:personaje.name,
    y:personaje.base_experience,
  }
  personajes_agregados_arr.push(new_personaje);
}