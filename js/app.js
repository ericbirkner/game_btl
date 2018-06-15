// JavaScript Document
console.log('hola');

var alto_barra = 0;

var app = angular.module("myApp", []);



app.controller("myCtrl", function($scope) {
  
	document.addEventListener('keyup', function (event) {
		if (event.defaultPrevented) {
			return;
		}

		var key = event.key || event.keyCode;

		console.log(event);

		if (event.keyCode == 32) {
			if(alto_barra<100){
				alto_barra++;
				
				//llamo funcion de angular
				document.getElementById('medidor').style.height = alto_barra+'%';
				
				
			}
		}
	});
});