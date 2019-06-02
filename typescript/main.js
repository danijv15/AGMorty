/*import * as Collections from 'typescript-collections';*/
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function RandEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/** classes para morty */
var CyberMorty = /** @class */ (function () {
    function CyberMorty(n) {
        this.salud = 15;
        this.inventario = [];
        this.Eventos = [];
        this.numbero = n;
    }
    return CyberMorty;
}());
function PonerMorty(indice, morty) {
    var fila = Math.floor(indice / 3) + 1;
    var columna = indice % 3;
    if (columna == 0) {
        columna = 3;
    }
    /** transicion de espera */
    var div = document.getElementById(fila + "-" + columna);
    div.innerHTML = "<div class='spinner-grow' role='status'> <span class='sr-only'>Loading...</span> </div>";
    //sleep(1000);
    /** imagen y estadisticas */
    var img = "<div class='col-md-4'><img src='img/cyborg-m.svg' class='card-img' alt='Cyborg'></div>";
    var estadisticasInicio = "<div class='col-md-8'><div class='card-body'><ul>";
    var estadisticasFinal = "<ul></div></div></div>";
    var salud = "<li>Salud: " + morty.salud + "</li>";
    var fuerza = "<li>fuerza: " + morty.fuerza + "</li>";
    var resistencia = "<li>Resistencia: " + morty.resistencia + "</li>";
    var inteligencia = "<li>Inteligencia: " + morty.inteligencia + "</li>";
    var estadisticas = "<div class='row no-gutters'>" + img + estadisticasInicio + salud + fuerza + resistencia + inteligencia + estadisticasFinal;
    /** Inventario */
    var objetos = "";
    for (var _a = 0, _b = morty.inventario; _a < _b.length; _a++) {
        var objeto = _b[_a];
        objetos += objeto + ",";
    }
    var inventario = "<ul class='list-group list-group-flush'><li class='list-group-item'><h6 class='card-title'>Inventario</h6><p>" + objetos + "</p></li>";
    /** Eventos */
    var evnts = "";
    for (var _c = 0, _d = morty.Eventos; _c < _d.length; _c++) {
        var even = _d[_c];
        evnts += "<li>" + even + "</li>";
    }
    var eventos = "<li class='list-group-item'><h6 class='card-title'>Eventos</h6><ul>" + evnts + "</ul></li></ul>";
    var card = "<div class='card mb-3' style='max-width: 540px;' > <h5 class='card-title'>CyberMorty " + morty.numbero + "</h5>" + estadisticas + inventario + eventos;
    div.innerHTML = card;
}
/*Inicio de helicoptero */
/** nodo para par ordenado xy **/
var xy = /** @class */ (function () {
    function xy() {
        this.x = -1;
        this.y = -1;
    }
    return xy;
}());
/** nodo para individuos */
var xyr = /** @class */ (function () {
    function xyr() {
        this.x = -1;
        this.y = -1;
        this.r = -1;
        this.obst = -1;
    }
    return xyr;
}());
;
/** nodo para resultados*/
var resultados = /** @class */ (function () {
    function resultados() {
        this.radio = -1;
        this.obt = -1;
        this.indice = -1;
    }
    return resultados;
}());
;
var Genetico = /** @class */ (function () {
    function Genetico(poblacion, Obstaculos, tolerancia, x, y, rMin) {
        /** listas de obstaculos e individuos */
        this.obstaculos = [];
        this.genAct = [];
        this.genSig = [];
        this.listResultados = [];
        this.mejores = [];
        this.nPoblacion = poblacion;
        this.nObstaculos = Obstaculos;
        this.obstaculosTolerados = tolerancia;
        this.maxX = x;
        this.maxY = y;
        this.rMinimoAcept = rMin;
        // llena el vector de resultados
        //cout<<"se inicializa el vector deresultados"<<endl;
        for (var _i = 0; _i < poblacion; _i++) {
            var nuevoCalculo = new resultados();
            this.listResultados.push(nuevoCalculo);
        }
        for (var a = 0; a < 10; a++) {
            var nuevo = new xyr();
            this.mejores.push(nuevo);
        }
        /*console.log("Constructor->listResuldados");
        console.log(this.listResultados);*/
    }
    Genetico.prototype.llenarObstaculos = function () {
        //cout<<"Se inicia la creacion de obstaculos"<<endl;
        for (var _i = 0; _i < this.nObstaculos; _i++) {
            var nuevoObst = new xy;
            nuevoObst.x = RandEntre(0, this.maxX - 1);
            nuevoObst.y = RandEntre(0, this.maxY) - 1;
            this.obstaculos.push(nuevoObst);
        }
        //cout<<"Se termina la creacion de obstaculos"<<endl;
    };
    /** generacion inicial*/
    Genetico.prototype.GenCero = function () {
        for (var i = 0; i < this.nPoblacion; i++) {
            var nuevo = new xyr();
            nuevo.x = RandEntre(0, this.maxX - 1);
            nuevo.y = RandEntre(0, this.maxY - 1);
            nuevo.r = RandEntre(0, this.maxX - 1);
            this.genAct.push(nuevo);
        }
    };
    /** aptitud de la gen actual **/
    Genetico.prototype.calcularAptitud = function () {
        var x1;
        var x2;
        var y1;
        var y2;
        var XX;
        var YY;
        for (var i = 0; i < this.nPoblacion; i++) {
            this.listResultados[i].indice = i;
            this.listResultados[i].radio = this.genAct[i].r;
            //par ordenado de xy para el calculo de distancia
            x1 = this.genAct[i].x;
            y1 = this.genAct[i].y;
            for (var a = 0; a < this.nObstaculos; a++) {
                x2 = this.obstaculos[a].x;
                y2 = this.obstaculos[a].y;
                XX = Math.pow((x2 - x1), 2);
                YY = Math.pow((y2 - y1), 2);
                var distacia = Math.sqrt(XX + YY);
                if (distacia <= this.genAct[i].r) {
                    this.listResultados[i].obt = this.listResultados[i].obt + 1;
                }
            }
        }
    };
    /** cruzar los individuos y guardados en genSig*/
    Genetico.prototype.cruzar = function (nCruces) {
        var padre;
        var madre;
        for (var i = 0; i < nCruces; i++) {
            // nuevo individuo
            var nuevo = new xyr();
            // se escojen 2 padres aleatorios
            padre = RandEntre(0, this.nPoblacion - 1);
            madre = RandEntre(0, this.nPoblacion - 1);
            nuevo.x = this.genAct[padre].x;
            nuevo.y = this.genAct[madre].y;
            nuevo.r = Math.floor((this.genAct[padre].r + this.genAct[madre].r) / 2);
            this.genSig.push(nuevo);
        }
    };
    /** muta cierta cantidad de la población **/
    Genetico.prototype.mutar = function (nMutaciones) {
        var j; // para escoger un individuo
        var xVar, yVar, rVar; // variables para saber si creece o decrece el valor
        for (var i = 0; i < nMutaciones; i++) {
            // nuevo individuo mutado
            var nuevo = new xyr();
            j = RandEntre(0, this.nPoblacion - 1);
            /** genera una mutación del 10% en X **/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].x * 1.10) < this.maxX) // 1 para incrementar
             {
                nuevo.x = Math.floor(this.genAct[j].x * 1.10);
            }
            else {
                nuevo.x = Math.floor(this.genAct[j].x * 0.9);
            }
            /** genera una mutación del 10% en Y **/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].y * 1.10) < this.maxY) {
                nuevo.y = Math.floor(this.genAct[j].y * 1.10);
            }
            else {
                nuevo.y = Math.floor(this.genAct[j].y * 0.9);
            }
            /** genera una mutación del 10% en R **/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].r * 1.10) < this.maxX) {
                nuevo.r = Math.floor(this.genAct[j].r * 1.10);
            }
            else {
                nuevo.r = Math.floor(this.genAct[j].r * 0.9);
            }
            this.genSig.push(nuevo);
        }
    };
    /** método que selecciona lo que tienen área más pequeña **/
    Genetico.prototype.chapas = function (nChapas) {
        // primero se ordena el vector de resultados
        this.listResultados.sort(function (a, b) {
            if (a.radio < b.radio) {
                return 1;
            }
            if (a.radio > b.radio) {
                return -1;
            }
            return 0;
        });
        for (var i = 0, j = this.nPoblacion - 1; i < nChapas; i++) {
            var nuevo = new xyr();
            // se seleccionan los nChapas para la nueva generación
            nuevo.x = this.genAct[this.listResultados[j - i].indice].x;
            nuevo.y = this.genAct[this.listResultados[j - i].indice].y;
            nuevo.r = this.genAct[this.listResultados[j - i].indice].r;
            this.genSig.push(nuevo);
        }
    };
    /**
     * Mejorar la forma de seleccion para tener la lista de mejores lo más llena posible. Primero viendo si hay dummies y si no hay entonces si remplazas
     */
    Genetico.prototype.SeleccionarMejores = function () {
        var r;
        var i;
        for (var a = 0; a < 10; a++) {
            r = this.listResultados[a].radio;
            if (r > this.rMinimoAcept && this.listResultados[a].obt <= this.obstaculosTolerados) {
                i = 0;
                while (i < 10 && (this.listResultados[a].radio <= this.mejores[i].r || this.listResultados[1].obt <= this.mejores[i].obst)) {
                    i++;
                }
                if (i < 10) {
                    this.mejores[i].x = this.genAct[this.listResultados[a].indice].x;
                    this.mejores[i].y = this.genAct[this.listResultados[a].indice].y;
                    this.mejores[i].r = this.genAct[this.listResultados[a].indice].r;
                    this.mejores[i].obst = this.listResultados[a].obt;
                    console.log("Candidado (" + this.mejores[i].x + ", " + this.mejores[i].y + ") r: " + this.mejores[i].r + " obst: " + this.mejores[i].obst);
                }
            }
        }
    };
    Genetico.prototype.limpiarGenSig = function () {
        for (var invividuo in this.genSig) {
            invividuo = undefined;
        }
        this.genSig = [];
    };
    Genetico.prototype.imprimirMejores = function () {
        var temp;
        for (var a = 2; a < 10; a++) {
            for (var b = 0; b < 9; b++) {
                if ((this.mejores[b].r / this.mejores[b].obst) < (this.mejores[b + 1].r / this.mejores[b + 1].obst)) {
                    temp = this.mejores[b];
                    this.mejores[b] = this.mejores[b + 1];
                    this.mejores[b + 1] = temp;
                }
            }
        }
        for (var i = 0; i < 10; i++) {
            console.log("-> " + i + "- (" + this.mejores[i].x + ", " + this.mejores[i].y + ") r: " + this.mejores[i].r + " obstaculos: " + this.mejores[i].obst + "\n");
        }
    };
    Genetico.prototype.CalcularPuntos = function (cruces, mutaciones, chapas, generaciones) {
        this.llenarObstaculos();
        /** primera generacion de individuos */
        this.GenCero();
        /** se evaluan y escogen los mejores individuos**/
        this.calcularAptitud();
        this.SeleccionarMejores();
        /*console.log("Gen 0");
        console.log(this.genAct);*/
        for (var i = 0; i < generaciones; i++) {
            /** se genera la siguiente generación **/
            /*console.log("Generacion "+i);*/
            this.cruzar(cruces);
            this.mutar(mutaciones);
            this.chapas(chapas);
            // Se asigna la nueva generación
            this.genAct = this.genSig;
            /*if(i%5==0)
            {
                console.log("CalcularPuntos->GenAct");
                console.log(this.genAct);
            }*/
            // Se eliminan los viejos individuos
            this.limpiarGenSig();
            this.calcularAptitud();
            this.SeleccionarMejores();
            /** se repite el proceso n veces */
        }
        console.log("** Las mejores opciones son:\n");
        this.imprimirMejores();
    };
    return Genetico;
}());
;
/* Fin de helicoptero */
function main() {
    var div = document.getElementById(1 + "-" + 2);
    div.innerHTML = "<div class='bg-dark' role='status'> </div>";
    sleep(500);
    var CyMort = new CyberMorty(20);
    CyMort.fuerza = 15;
    CyMort.inteligencia = 3;
    CyMort.resistencia = 5;
    CyMort.inventario.push("ropa");
    CyMort.inventario.push("lanza");
    CyMort.Eventos.push("Saludo a un lobo y este lo mordió");
    CyMort.Eventos.push("Llamo a la llama que llama");
    PonerMorty(2, CyMort);
}
/*var contenido = main();
var contenedor = document.getElementById('contenedor-1');
contenedor.innerHTML= main();
alert("inicio de programa");
var G= new Genetico(50,15,1,100,100,10);
G.CalcularPuntos(35,10,5,60);*/
