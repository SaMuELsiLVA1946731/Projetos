var vidas = 3;
var altura = 0;
var tempo = 10;
var largura = 0;
var fundo;

var nivel = window.location.href.slice(40);

var criarMosquitoTempo;

Nivel(nivel);

function Nivel(nivel) {

    
    /* nivel = nivel.replace('?', '');  */
    /* alert(nivel + " disparado do script");  */


    switch (nivel) {
        case "normal":
            criarMosquitoTempo = 1000;
            break;
        case "dificil":
            criarMosquitoTempo = 800;
            break;
        case "muitoDificil":
            criarMosquitoTempo = 600;
            break;
    
        
    }
     
}

function ajustarTamanhoPalcoJogo() {

    largura = window.innerWidth /* largura */
    altura = window.innerHeight /* altura */

   /*  var random = Math.random();
    console.log("random: " + random);
    
    console.log(Math.ceil(random));
    console.log(random * largura);
    console.log(random * altura); */
    
   /*  var posicaoX = Math.ceil(random * largura);
    var posicaoY = Math.ceil(random * altura); */
    
    /* console.log( "l: " + largura, "x: " + altura);
    console.log("X: " + posicaoX, "y: " + posicaoY);   */


}

ajustarTamanhoPalcoJogo();

/* alert(nivel); */
if(nivel != undefined && nivel != null && nivel != ""){

var cronometro = setInterval(function () {

tempo = tempo - 1;

    if (tempo <= 0) {

        clearInterval(cronometro);
        clearInterval(criarMosquitoTempo);

        alert('Vitoria');

        window.location.href = "vitoria.html";

    } else {

        document.getElementById('cronometro').innerHTML = tempo;

    }

}, 1000); 

};

function PosicaoRandomica() {

    if (document.getElementById('mosquito')) {

        document.getElementById('mosquito').remove();

        if (vidas < 1) {

            window.location.href = "fim_de_jogo.html";

        } else {

            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas--;
        }
    }

    var posicaoX = Math.ceil(Math.random() * largura) - 90;
    var posicaoY = Math.ceil(Math.random() * altura) - 90;


    posicaoX = posicaoX  < 1 ? 200 : posicaoX;
    posicaoY = posicaoY < 1 ? 200 : posicaoY;

    var mosquito = document.createElement("img");

    switch (nivel){
        case "normal":
            mosquito.src = 'imagens/mosquito.png';
        break;
        case "dificil":
            mosquito.src = 'imagens/mosquito_feio.png';
        break;
        case "muitoDificil":
            mosquito.src = 'imagens/feio 2.png';
        break;
    }

    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = "absolute";
    mosquito.id = "mosquito";
    
    mosquito.onclick = function(){

        this.remove();
    }

    document.body.appendChild(mosquito); 

}

function tamanhoAleatorio(){
    
    var classe = Math.floor(Math.random() * 3);

    switch(classe){
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2 );

    switch(classe){
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}