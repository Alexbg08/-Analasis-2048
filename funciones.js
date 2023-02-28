var tablero;
var puntaje = 0;
var filas = 4;
var columnas = 4;
var contadorPiezas = 0;
var cont_Jugadas = 0;
var tiempo = 0;
var minutos = 0;
var segundos = 0;
var mejor = 0;
var btn_Resumen = document.getElementById('resumen'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btn_cerrar = document.getElementById('btn_cerrar'),
    btn_reiniciar = document.getElementById('btn_reiniciar'),
    ganar_Perder = document.getElementById('ganar_Perder'),
    contador = document.getElementById('tiempo');

btn_Resumen.addEventListener('click', function(){
    overlay.classList.add('active');
    popup.classList.add('active');
});

btn_cerrar.addEventListener('click', function(){
    overlay.classList.remove('active')
    popup.classList.remove('active');
});

window.onload = function() {
    setGame();
}

setInterval(actualizarTiempo, 1000);

function setGame() {

   tablero = [
       [0, 0, 1024, 1024],
       [0, 0, 0, 0],
       [0, 0, 0, 0],
       [0, 0, 0, 0]
   ]

   for (let f = 0; f < filas ; f ++) {
       for (let c = 0; c < columnas; c ++) {
           let recuadro = document.createElement("div");
           recuadro.id = f.toString() + "-" + c.toString();
           let num = tablero [f][c];
           actualizaTab(recuadro, num); 
           document.getElementById ( "tablero" ).append(recuadro);
       }
   }
   //crea 2 valores aleatorios para comenzar el juego
    generaDos();
    generaDos();
}

function resetGame(){
    for (let f = 0; f < filas; f ++) {
        for (let c = 0; c < columnas; c ++) {
            tablero[f][c] = 0;
        }
    }
    generaDos();
    document.getElementById("ganar").style.visibility = "visible"; 
    document.getElementById("ganar_Perder").style.visibility = "visible"; 
    if(puntaje > mejor){
        mejor = puntaje;
        document.getElementById ("mejor").innerText = mejor;
    }   

}

//Revisa el tablero para saber quien gano
function checkForWin(){
    for (let f = 0; f < filas; f++){
        for(let c = 0; c < columnas; c++){
            if(tablero[f][c] == 2048){
                resetGame();
            }
        }
    }
}

function actualizaTab (recuadro, num) {
    recuadro.innerText = "";
    recuadro.classList.value = "";
    recuadro.classList.add("recuadro");
    if(num > 0) {
        recuadro.innerText = num.toString();
        if(num <= 4096){
            recuadro.classList.add("n" + num.toString());  
        }else{
            recuadro.classList.add("n8192"); ///fijarse en el css
        }
    }
}

document.addEventListener ('keyup', (e) => { 
    if (e.code == "ArrowLeft") { 
        movIzquierda();
        generaDos();
        cont_Jugadas++;
    }
    else if ( e.code == "ArrowRight") {   
        movDerecha();
        generaDos();
        cont_Jugadas++;
    }
    else if(e.code == "ArrowUp") {   
       movArriba();
       generaDos();
       cont_Jugadas++;
    }
    else if(e.code == "ArrowDown") {
       movAbajo();
       generaDos();
       cont_Jugadas++;
    }
    cantidadFichas();
    document.getElementById ("puntaje").innerText = puntaje;
    document.getElementById ("total_movimientos").innerText = cont_Jugadas;
    document.getElementById ("total_piezas").innerText = contadorPiezas;
    checkForWin();    
} )

function filterZero (fila){
    return fila.filter(num => num != 0);  // crea una nueva matriz de todos los números! = 0
}

function mover(fila){
   //[0, 2, 2, 2]
   fila = filterZero (fila);  //[2, 2, 2]
   for(let i = 0; i < fila.length-1; i++) {
       if  ( fila [i] == fila[i + 1]) {
           fila [i] *= 2;
           fila [i + 1] = 0;
           puntaje +=  fila [i] ;
       }
   }  //[4, 0, 2]
   fila  =  filterZero(fila);  //[4, 2]
   //añadir ceros
    while(fila.length < columnas)  {
       fila.push(0);
    }  //[4, 2, 0, 0]
    return fila;
}

///////////////////////////////////////////////////////////////

function  movIzquierda() {
   for  (let f = 0 ; f < filas; f++)  {
        let fila = tablero[f];
        fila = mover(fila) ;
        tablero[f] = fila;
        for (let c = 0; c < columnas; c++) {
        let recuadro = document.getElementById ( f.toString() + "-" + c.toString());
            let num = tablero[f][c] ;
            actualizaTab( recuadro ,  num ) ;
       }
   }
}

function  movDerecha() {
   for  (let f =  0 ;  f < filas; f++)  {
       let  fila  =  tablero [f] ;          //[0, 2, 2, 2]
       fila.reverse();               //[2, 2, 2, 0]
       fila = mover(fila)             //[4, 2, 0, 0]
       tablero [f] = fila.reverse();    //[0, 0, 2, 4];
       for  (let c = 0; c < columnas; c++) {
           let recuadro = document.getElementById (f.toString() + "-" + c.toString());
           let num = tablero[f][c];
           actualizaTab( recuadro, num);
       }
   }
}

function movArriba( ) {
   for  (let c = 0; c < columnas; c++) {
       let fila = [ tablero[0][c], tablero[1] [c], tablero[2][c], tablero[3][c]] ;
       fila  =  mover( fila ) ;
       // tablero[0][c] = fila[0];
       // tablero[1][c] = fila[1];
       // tablero[2][c] = fila[2];
       // tablero[3][c] = fila[3];
       for  (let f = 0; f < filas; f++ ) {
           tablero[f][c] = fila[f] ;
           let  recuadro  =  document.getElementById (f.toString() + "-" + c.toString());
           let  num  =  tablero [ f ] [ c ] ;
           actualizaTab( recuadro, num);
       }
   }
}

function  movAbajo() {
   for  (let c = 0; c < columnas; c++)  {
       let  fila  =  [tablero[0][c], tablero[1][c], tablero[2][c], tablero[3][c]];
       fila.reverse();
       fila = mover(fila);
       fila.reverse();
       // tablero[0][c] = fila[0];
       // tablero[1][c] = fila[1];
       // tablero[2][c] = fila[2];
       // tablero[3][c] = fila[3];
       for (let f =  0 ; f < filas; f++) {
           tablero [f][c] = fila[f];
           let  recuadro =  document.getElementById(f.toString() + "-" + c.toString());
           let  num  =  tablero [f][c];
           actualizaTab(recuadro, num);
       }
   }
}

function  generaDos() {
    if  (!recuadroVacio()) {
        return;
    }
    let existente = false;
    while(!existente) {
       //busca filas y columnas aleatorias para colocar un 2 en
        let f =  Math.floor(Math.random() * filas);
        let c =  Math.floor(Math.random() * columnas);
        if (tablero[f][c] == 0) {
            tablero[f][c] = 2;
            let  recuadro = document.getElementById (f.toString() + "-" + c.toString());
            recuadro.innerText = "2";
            recuadro.classList.add("n2");
            existente = true;
       }
   }
}

function recuadroVacio() {
    let contador =  0 ; 
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (tablero [f][c] == 0) {  //al menos un cero en el tablero
            return true;
           }
       }
   }
   return false;
}

//arreglarlo
function cantidadFichas(){
    contadorPiezas = 0;
    for (let f = 0; f < filas; f ++) {
        for (let c = 0; c < columnas; c ++) {
            if(tablero[f][c] != 0){
                contadorPiezas ++;
            }
        }
    }
}

function actualizarTiempo(){
    tiempo++; 

    minutos = Math.floor(tiempo / 60);
    segundos = tiempo % 60;

    var minutosTexto = minutos < 10 ? "0" + minutos : minutos;
    var segundosTexto = segundos < 10 ? "0" + segundos : segundos;
    
    contador.innerText = minutosTexto + ":" + segundosTexto;
}
