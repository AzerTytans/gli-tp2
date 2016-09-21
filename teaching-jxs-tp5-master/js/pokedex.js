var pokeApp = angular.module('pokedex', ['ngResource']);

angular.module('pokedex').config(['$resourceProvider', function($resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('PokedexController', function($scope, $log, Pokemon, $rootScope){
	$scope.list =
		[{"name" : "squirtle", "num" : "7"},
		 {"name" : "charmander", "num" : "4"},
		 {"name" : "mewtwo", "num" : "150"},
		 {"name" : "pikachu", "num" : "25"}];

	$scope.go = function(){
		$log.log($scope.select_poke);
		$scope.id = $scope.select_poke;
		$rootScope.$broadcast('poke', $scope.id);
	};
	
	

});

pokeApp.controller('AffichageController', function($scope, Pokemon){
	$scope.$on('poke', function (event, arg) { 
		$scope.pokemon = Pokemon.get({id : arg});
		console.log($scope.pokemon);
		$scope.pokemon_stats = "Statistiques :";
		$scope.pokemon_attaque = "- Attaque : ";
		$scope.pokemon_defense = "- Défense : ";
	});

});

pokeApp.factory('Pokemon', function($resource) {
	return $resource('http://pokeapi.co/api/v1/pokemon/:id', { pokeId: '@id' });
});


var pokeApiUrl = "http://pokeapi.co/"
