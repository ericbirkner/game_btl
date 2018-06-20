// Eric Birkner JavaScript Document
var fin = false;
var alto_barra = 0;
var timer;
var downloadTimer;
var timeleft = 30;

//empieza todo despues de 3 segundos
setTimeout(function(){
		$('#intro').addClass('fadeOutDown');
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

	event.preventDefault();
	var key = event.key || event.keyCode;

	//console.log(event);

	if (event.keyCode == 32) {

		if(alto_barra < 100){
			if(!fin){
				alto_barra++;
				set_alto(alto_barra);
				oculta_video(alto_barra);
			}
		} else {
			final();
		}
	}
});

var mapping = ["A","B","X","Y","LB","RB","LT","RT","BACK","START","LS","RS","D-UP","D-DOWN","D-LEFT","D-RIGHT"];

function runAnimation()
{
    window.requestAnimationFrame(runAnimation);

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; ++i)
    {
        var pad = gamepads[i];
        if (pad){

          if(pad.buttons[0].pressed){
						if(alto_barra < 100){
							if(!fin){
								console.log(alto_barra);
								alto_barra = alto_barra + 0.3;								
								set_alto(alto_barra);
								oculta_video(alto_barra);
							}
						} else {
							final();
						}
					}
        }
            // todo; simple demo of displaying pad.axes and pad.buttons
    }
}

function oculta_video(valor){
	if(valor>=20){
		$('.video.uno').addClass('fadeOut animated');
		
	}
	if(valor>=40){
		$('.video.dos').addClass('fadeOut animated');
		
	}
	if(valor>=60){
		$('.video.tres').addClass('fadeOut animated');
		
	}
	
	if(valor>=80){
		$('.video.cuatro').addClass('fadeOut animated');
		
	}
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
	$('#ganador').addClass('fadeIn animated').css({display:'block'});
	$('.logo').addClass('final fadeInUp');
	
	if(alto_barra>=100){
		$('.mensaje').attr('src','images/winner.png');
	}
	
	$('.mensaje').addClass('bounceInDown animated').css({display:'block'});
}

window.requestAnimationFrame(runAnimation);
