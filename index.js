angular.module("PokeAnalysis", ['mm.foundation'])
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
          var pokemon = response;
        }).error(function() {
          console.log("Error with pokemon list retrival");
        });
    },
    getPokeInfo: function(pokeUri) {
      return $http.get("http://pokeapi.co/" + pokeUri)
        .success(function(response) {
          var pokemonInfo = response;
        }).error(function() {
          console.log("Pokemon retrival not working");
        });
    },
    getPokeSprite: function(spriteUri) {
      //var spriteUri = pokeUri.replace("pokemon", "sprite");
      return $http.get("http://pokeapi.co/" + spriteUri)
        .success(function(response) {
          var pokeSprite = response;
        }).error(function() {
          console.log("Sprite retrieval issues");
      });
    },
    getPokeDescription: function(descUri) {
      return $http.get("http://pokeapi.co/" + descUri)
        .success(function(response) {
          var pokeDesc = response;
        }).error(function() {
          console.log("Description retrieval issue.");
        });
    }
  };
}])

.controller("PokemonController", ['$scope', "PokeService", function($scope, PokeService) {
  $scope.cyrrentPage = 1;
  $scope.maxSize = 5;
  $scope.setPage = function(pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pokemonListing = function() {
    PokeService.getPokeList().then(
      function(pokemonList){
        $scope.pokemonList = pokemonList.data;
        $scope.totalPokemon = pokemonList.data.pokemon.length;
        console.log($scope.pokemonList.pokemon.length);
      });
  };
  $scope.pokemonRetrieval = function(pokeFind) {
    PokeService.getPokeInfo(pokeFind).then(
      function(pokemonInfo){
        $scope.pokeInfo = pokemonInfo.data;
        $scope.totalPokemon = pokemonInfo.data;
        console.log($scope.pokeInfo.descriptions[0].resource_uri);

        PokeService.getPokeSprite($scope.pokeInfo.sprites[0].resource_uri).then(
          function(pokeSprite) {
            $scope.pokeSprite = "http://pokeapi.co/" + pokeSprite.data.image;
        });

        PokeService.getPokeDescription($scope.pokeInfo.descriptions[0].resource_uri).then(
          function(pokemonDescription) {
            $scope.pokeDescription = pokemonDescription.data;
            console.log($scope.pokeDescription);
        });
    });
  };

    $scope.pokemonListing();
}]);
