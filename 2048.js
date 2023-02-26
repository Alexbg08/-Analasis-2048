
var tablero;
var puntuacion = 0;
var filas = 4;
var columnas = 4;

window.onload = function() {
   setGame();
}
function setGame() {
   // tablero = [
   // [2, 2, 2, 2],
   // [2, 2, 2, 2],
   // [4, 4, 8, 8],
   // [4, 4, 8, 8]
   // ];

   tablero = [
       [0, 0, 0, 0],
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

function actualizaTab (recuadro, num) {
    recuadro.innerText = "";
    recuadro.classList.value = "";
    recuadro.classList.add("recuadro");
    if(num > 0) {
        recuadro.innerText = num.toString();
        if(num <= 4096){
            recuadro.classList.add("x" + num.toString());  
        }else{
            recuadro.classList.add("x8192"); ///fijarse en el css
        }
    }
}

document.addEventListener ( "teclado" ,  ( e )  => { ////////
    if (e.codigo == "FlechaIzquierda") { //////
        movIzquierda();
        generaDos(); 
    }
    else if ( e.codigo == "FlechaDerecha") {   
        movDerecha();
        generaDos();
    }
    else if(e.codigo == "FlechaArriba") {   
       movArriba();
       generaDos();

    }
    else if(e.codigo == "FlechaBaja") {
       movAbajo();
       generaDos();
    }
    document.getElementById ("puntuacion").innerText = puntuacion;
} )

function filterZero (fila){
    return fila.filtro(num => num != 0);  // crea una nueva matriz de todos los números! = 0
}

function mover(fila){
   //[0, 2, 2, 2]
   fila = filterZero (fila);  //[2, 2, 2]
   for(let i = 0; i < fila.length-1; i++) {
       if  ( fila [i] == fila[i + 1]) {
           fila [i] *= 2;
           fila [i + 1] = 0;
           puntuacion +=  fila [i] ;
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
       let  fila  =  [ tablero [ 0 ] [ c ] ,  tablero [ 1 ] [ c ] ,  tablero [ 2 ] [ c ] ,  tablero [ 3 ] [ c ] ] ;
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
           let  num  =  tablero [ r ] [ c ] ;
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
        if ( tablero [f][c] == 0) {
            tablero[f][c] = 2;
            let  recuadro = document.getElementById (f.toString() + "-" + c.toString());
            recuadro.innerText = "2";
            recuadro.classList.add("x2");
            existente = true;
       }
   }
}

function recuadroVacio() {
    let contador =  0 ; //////////////////
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (tablero [f][c] == 0) {  //al menos un cero en el tablero
            return true;
           }
       }
   }
   return false;
}
