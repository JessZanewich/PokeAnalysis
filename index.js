/*$(document).ready(function() {
  $.getJSON("http://pokeapi.co/api/v1/pokedex/1/", function(response){
    console.log(response);
  });
  retrieveSprite();
  function retrieveSprite() {
    $.getJSON("http://pokeapi.co/api/v1/sprite/1/", function(data){
      $(".sprite").html("<img src=http://pokeapi.co" + data.image + ">");

    });
  };

});*/


angular.module("PokeAnalysis", [])
.factory("PokeService", ["$http", function($http) {
  return {
    getPokeList: function() {
      var pokemon = [];
      return $http.get("http://pokeapi.co/api/v1/pokedex/1/")
        .success(function(response) {
          console.log(response + "Found");
          pokemon = response;
        }).error(function() {
          console.log("Error with pokemon retrieval");
        });
    }
  };
}])

.controller("PokemonController", ['$scope', "PokeService", function($scope, PokeService) {

  $scope.pokemonList = function() {
    PokeService.getPokeList().then(
      function(pokemon){
        $scope.pokemon = pokemon;
        console.log(pokemon);
      });
  };
}]);
