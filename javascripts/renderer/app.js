// Eric Birkner JavaScript Document
var fin = false;
var alto_barra = 0;
var timer;
var downloadTimer;
var timeleft = 30;
var empezo = false;
var cuenta = false;
var dificultad = 0.25;

$(document).ready(function(){
	$('#panel input[type=range]').val(dificultad);
	$('#setup').on('click',function(){
		$('#panel').fadeToggle('fast');
	});
	$('#panel button').on('click',function(){
		$('#panel').fadeToggle('fast');
	});
});

function inicio(){
	
	if(!empezo){
	    console.log('inicio el juego');
		empezo = true;
		setTimeout(function(){
			cuenta = true;
			$('#intro').fadeOut('slow');
			downloadTimer = setInterval(function(){
			timeleft--;
			document.getElementById("countdowntimer").textContent = timeleft;
			myTimer();
			if(timeleft <= 0){
				//se acabó el tiempo
				final();
			}
			},1000);			
		},
		2500);
		return;
	}else{
		return false;	
	}	
}


function myTimer() {
	if(alto_barra>0){
		alto_barra = alto_barra-1;
		console.log(alto_barra);
		document.getElementById('medidor').style.height = alto_barra+'%';
	}
}

function myStopFunction() {
    clearInterval(timer);
}


document.addEventListener('keyup', function (event) {
	event.preventDefault();
	var key = event.key || event.keyCode;

	//console.log(event);

	if (event.keyCode == 32) {
		if(empezo){
			if(alto_barra < 100){
				if((!fin)&&(cuenta===true)){
					alto_barra++;
					set_alto(alto_barra);
					oculta_video(alto_barra);
				}
			} else {
				final();
			}
		}else{
			console.log('teclado ql');
		  inicio();
	    }
	}
	
	return !(event.keyCode == 32 && event.target == document.body);
});

//var mapping = ["A","B","X","Y","LB","RB","LT","RT","BACK","START","LS","RS","D-UP","D-DOWN","D-LEFT","D-RIGHT"];

function runAnimation(){
    window.requestAnimationFrame(runAnimation);

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; ++i)
    {
        var pad = gamepads[i];
        if (pad){

          if(pad.buttons[0].pressed){
			  console.log('fuelle ql');
		  	  inicio();

			  if(empezo){
						if(alto_barra < 100){
							if((!fin)&&(cuenta===true)){
								console.log(alto_barra);
								alto_barra = alto_barra + dificultad;								
								set_alto(alto_barra);
								oculta_video(alto_barra);
							}
						} else {
							final();
						}
					}
			  }
        }
            // todo; simple demo of displaying pad.axes and pad.buttons
    }
}

function oculta_video(valor){
	if(valor>=20){
		$('.video.uno').addClass('fadeOut');
		
	}
	if(valor>=40){
		$('.video.dos').addClass('fadeOut');
		
	}
	if(valor>=60){
		$('.video.tres').addClass('fadeOut');
		
	}
	
	if(valor>=80){
		$('.video.cuatro').addClass('fadeOut');
		
	}
}

function set_dificultad(valor){
	dificultad = parseFloat(valor);
	console.log(valor);
}

function set_alto(valor){
	var alto = 507 * valor;
	var porcentaje = alto/100;
	console.log("porcentaje: "+porcentaje);
	if(porcentaje<=507){
		document.getElementById('medidor').style.height = porcentaje+'px';
	}
	
}

function final(){
	fin = true;
	clearInterval(downloadTimer);
	$('#ganador').fadeIn('slow');
	$('.logo').addClass('final').removeClass('zoomInUp');
	
	if(alto_barra>=100){
		$('.mensaje').attr('src','images/winner.png');
	}else{
		$('.mensaje').attr('src','images/looser.png');
	}
	
	$('.mensaje').fadeIn('slow');
	
	setTimeout(function(){
		//location.reload();		
		//location.href="index.html";

		fin = false;
		alto_barra = 0;
		timer = null;
		downloadTimer = null;
		timeleft = 30;
		empezo = false;
		cuenta = false;

		$('#ganador').fadeOut('slow');
		$('.logo').removeClass('final').addClass('zoomInUp');
		$('.mensaje').fadeOut('slow');
		$('#intro').fadeIn('slow');

		$('.video.uno').removeClass('fadeOut');
		$('.video.dos').removeClass('fadeOut');
		$('.video.tres').removeClass('fadeOut');
		$('.video.cuatro').removeClass('fadeOut');
		document.getElementById('medidor').style.height = '0px';
		document.getElementById("countdowntimer").textContent = timeleft;

	},5000);
}

window.requestAnimationFrame(runAnimation);
