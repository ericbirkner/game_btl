// JavaScript Document
var fin = false;
var alto_barra = 0;

var timer;
var downloadTimer;
var timeleft = 30;

//empieza todo despues de 3 segundos
setTimeout(function(){
		downloadTimer = setInterval(function(){
		timeleft--;
		document.getElementById("countdowntimer").textContent = timeleft;
		myTimer();
		if(timeleft <= 0){
			fin = true;
			//detengo los cronometros
			clearInterval(downloadTimer);
		}		
		},1000);
	
	
}, 
3000);

function myTimer() {
	if(alto_barra>0){
		alto_barra = alto_barra-2;
		console.log(alto_barra);
		document.getElementById('medidor').style.height = alto_barra+'%';
	}
}

function myStopFunction() {
    clearInterval(timer);
}

  
document.addEventListener('keyup', function (event) {
	if (event.defaultPrevented) {
		return;
	}

	var key = event.key || event.keyCode;

	//console.log(event);

	if (event.keyCode == 32) {
		
		if(alto_barra < 100){
			if(!fin){
				alto_barra++;
				document.getElementById('medidor').style.height = alto_barra+'%';
			}	
		} else {
			fin = true;
			clearInterval(downloadTimer);
		}
	}
});
