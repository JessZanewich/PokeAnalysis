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
/*.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: "pokemonList.html",
      controller: "PokemonController"
    }).
    when('/pokemon/:pokemonId', {
      templateUrl: "singlePokemon/singlePoke.html",
      controller: "PokemonController"
    });
}])*/

.factory("PokeService", ["$http", function($http) {
  return {
    getPokeList: function() {
      return $http.get("http://pokeapi.co/api/v1/pokedex/1/")
        .success(function(response) {
          console.log(response);
          var pokemon = response;
        }).error(function() {
          console.log("Error with pokemon list retrival");
        });
    },
    getPokeInfo: function(pokeUri) {
      return $http.get("http://pokeapi.co/" + pokeUri)
        .success(function(response) {
          console.log(response);
        }).error(function() {
          console.log("Pokemon retrival not working");
        });
    }
  };
}])

.controller("PokemonController", ['$scope', "PokeService", function($scope, PokeService) {
  $scope.pokemonListing = function() {
    PokeService.getPokeList().then(
      function(pokemonList){
        $scope.pokemonList = pokemonList.data;
        console.log(pokemonList.data);
      });
  };
  $scope.pokemonRetrieval = function(pokeFind) {

    PokeService.getPokeInfo(pokeFind).then(
      function(pokemonInfo){
        $scope.pokeInfo = pokemonInfo.data;
        console.log($scope.pokeInfo);
      }
    )
  }
    $scope.pokemonListing();
}]);
