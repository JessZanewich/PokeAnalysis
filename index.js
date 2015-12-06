$(document).ready(function() {
  $.getJSON("http://pokeapi.co/api/v1/pokedex/1/", function(response){
    console.log(response);
  });
});
