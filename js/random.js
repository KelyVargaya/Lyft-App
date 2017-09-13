const aleatorio = {
	variable: {
		codigo: undefined,
	},

	inicio: function(){
		$("#btn-siguiente").click(aleatorio.codigo);
		$("#btn-confirmar").click(aleatorio.validar)
	
	},

	codigo: function(){
		var text = "";
		var posible = "0123456789";
		var palabraClave = "LAB-";
		
		for (var i = 0; i < 3; i++){
			text += posible.charAt(Math.floor(Math.random() * posible.length));
			codigo = palabraClave + text;
		}
		alert("Tu codigo es: \n\n" + codigo);
	},

	validar: function(){

			var inputVal = $("#confirmCode").val(); 
			if(inputVal != codigo){
       		 $(".modal-body").append("<span class='span-style'>Coidgo invalido</span>");
			}else{
				window.location.href="usuario.html";
			};
	},
};
$(document).ready(aleatorio.inicio);
