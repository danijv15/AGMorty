"use strict";
exports.__esModule = true;
var retos_1 = require("./retos");
/************************ HERRAMIENTAS    */
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
function tieneLanza(lanza) { return lanza === "Lanza"; }
function tieneArco(arco) { return arco === "Arco"; }
function tieneEscudo(escudo) { return escudo === "Escudo"; }
/** clase para nodo morty */
var CyberMorty = /** @class */ (function () {
    function CyberMorty() {
        this.id = -1;
        this.salud = -1;
        this.fuerza = -1;
        this.resistencia = -1;
        this.inteligencia = -1;
        this.inventario = [];
        this.Eventos = [];
    }
    return CyberMorty;
}());
var puntaje = /** @class */ (function () {
    function puntaje() {
        this.indice = 0;
        this.puntaje = 0;
    }
    return puntaje;
}());
var Genetico = /** @class */ (function () {
    function Genetico(poblacion, generaciones) {
        this.idAcumulativo = -1;
        /** listas de inventarios, eventos e individuos */
        //listaInventario:Inventario[]=[];
        this.listaEventos = [];
        this.listaResultados = [];
        this.genAct = [];
        this.genSig = [];
        this.mejores = [];
        this.nPoblacion = poblacion;
        this.nGeneraciones = generaciones;
        // llena el vector de resultados
        for (var _i = 0; _i < poblacion; _i++) {
            var nuevoCalculo = new puntaje();
            this.listaResultados.push(nuevoCalculo);
        }
        //inicializacion del array de los 9 mejores mortys de todas las generaciones
        for (var a = 0; a < 9; a++) {
            var nuevo = new CyberMorty();
            this.mejores.push(nuevo);
        }
    }
    /** LLenar el vector de Eventos*/
    Genetico.prototype.llenarEventosMorty = function () {
        for (var a = 0; a < this.conejosDomesticos; a++) {
            var evnt = new retos_1.ConejoDomestico();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.conejosSalvajes; a++) {
            var evnt = new retos_1.ConejoSalvaje();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.tigres; a++) {
            var evnt = new retos_1.Tigre();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.osos; a++) {
            var evnt = new retos_1.Oso();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.lobos; a++) {
            var evnt = new retos_1.Lobo();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.hongos; a++) {
            var evnt = new retos_1.Hongo();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.fuegos; a++) {
            var evnt = new retos_1.Fuego();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.clavos; a++) {
            var evnt = new retos_1.Clavos();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.lanzas; a++) {
            var evnt = new retos_1.Lanza();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.arcos; a++) {
            var evnt = new retos_1.Arco();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.pociones; a++) {
            var evnt = new retos_1.Pocion();
            this.listaEventos.push(evnt);
        }
        for (var a = 0; a < this.escudos; a++) {
            var evnt = new retos_1.Escudo();
            this.listaEventos.push(evnt);
        }
    };
    /** Generacion inicial*/
    Genetico.prototype.GenCero = function () {
        for (var i = 0; i < this.nPoblacion; i++) {
            this.idAcumulativo++;
            var nuevo = new CyberMorty();
            nuevo.id = this.idAcumulativo;
            //SE USAN VALORES ENTRE 1 Y 10 EN TODAS LAS STATS
            nuevo.salud = RandEntre(1, 10);
            nuevo.fuerza = RandEntre(1, 10);
            nuevo.resistencia = RandEntre(1, 10);
            nuevo.inteligencia = RandEntre(1, 10);
            this.genAct.push(nuevo);
        }
    };
    /** aptitud de la gen actual **/
    Genetico.prototype.calcularAptitud = function () {
        for (var a = 0; a < this.nPoblacion; a++) {
            for (var i = 0; i < this.nEventos; i++) {
                var iRand = RandEntre(0, this.totalEventos);
                // si sigue vivo entonces se enfrenta a un nuevo evento
                if (this.genAct[a].salud > 0) {
                    this.listaEventos[iRand].interactuar(this.genAct[a]);
                }
            }
            var puntaje_1 = this.genAct[a].salud;
            puntaje_1 += 20 - this.genAct[a].fuerza;
            puntaje_1 += 20 - this.genAct[a].resistencia;
            puntaje_1 += 20 - this.genAct[a].inteligencia;
            //console.log(this.genAct[a].inventario.find(tieneLanza));
            //if(this.genAct[a].inventario.find(tieneLanza)
            /** falta: falta probar la funcion de find para ajustar el puntaje */
            if (this.genAct[a].salud < 1) {
                puntaje_1 -= 20;
            }
            this.genAct[a].puntaje = puntaje_1;
        }
    };
    /** cruzar los Mortys y guardarlos en genSig*/
    Genetico.prototype.cruzar = function (nCruces) {
        var padre;
        var madre;
        for (var i = 0; i < nCruces; i++) {
            this.idAcumulativo++;
            // nuevo individuo
            var nuevo = new CyberMorty();
            nuevo.id = this.idAcumulativo;
            // se escojen 2 padres aleatorios
            padre = RandEntre(0, this.nPoblacion - 1);
            madre = RandEntre(0, this.nPoblacion - 1);
            if (RandEntre(0, 1)) {
                nuevo.salud = this.genAct[padre].salud;
            }
            else {
                nuevo.salud = this.genAct[madre].salud;
            }
            if (RandEntre(0, 1)) {
                nuevo.fuerza = this.genAct[padre].fuerza;
            }
            else {
                nuevo.fuerza = this.genAct[madre].fuerza;
            }
            if (RandEntre(0, 1)) {
                nuevo.resistencia = this.genAct[padre].resistencia;
            }
            else {
                nuevo.resistencia = this.genAct[madre].resistencia;
            }
            if (RandEntre(0, 1)) {
                nuevo.inteligencia = this.genAct[padre].inteligencia;
            }
            else {
                nuevo.inteligencia = this.genAct[madre].inteligencia;
            }
            this.genSig.push(nuevo);
        }
    };
    /** muta cierta cantidad de Mortys **/
    Genetico.prototype.mutar = function (nMutaciones) {
        var j; // para escoger un individuo
        for (var i = 0; i < nMutaciones; i++) {
            this.idAcumulativo++;
            // nuevo individuo mutado
            var nuevo = new CyberMorty();
            nuevo.id = this.idAcumulativo;
            j = RandEntre(0, this.nPoblacion - 1);
            /** genera una mutación del 20% en salud **/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].salud * 1.20) < 20) // 20 es el valor maximo
             {
                nuevo.salud = Math.floor(this.genAct[j].salud * 1.20);
            }
            else {
                nuevo.salud = Math.floor(this.genAct[j].salud * 0.8);
            }
            /** genera una mutación del 20% en fuerza **/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].fuerza * 1.10) < 20) // 20 es el valor maximo
             {
                nuevo.fuerza = Math.floor(this.genAct[j].fuerza * 1.10);
            }
            else {
                nuevo.fuerza = Math.floor(this.genAct[j].fuerza * 0.8);
            }
            /** genera una mutación del 20% en resistencia**/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].resistencia * 1.20) < 20) // 20 es el valor maximo
             {
                nuevo.resistencia = Math.floor(this.genAct[j].resistencia * 1.20);
            }
            else {
                nuevo.resistencia = Math.floor(this.genAct[j].resistencia * 0.8);
            }
            /** genera una mutación del 20% en inteligencia**/
            if (RandEntre(0, 1) && Math.floor(this.genAct[j].inteligencia * 1.20) < 10) // 10 es el valor maximo
             {
                nuevo.inteligencia = Math.floor(this.genAct[j].inteligencia * 1.20);
            }
            else {
                nuevo.inteligencia = Math.floor(this.genAct[j].inteligencia * 0.8);
            }
            this.genSig.push(nuevo);
        }
    };
    /** método que selecciona lo que tienen estadisticas mas bajas **/
    Genetico.prototype.chapas = function (nChapas) {
        // primero se ordenan los mortys
        this.genAct.sort(function (a, b) {
            if (a.puntaje < b.puntaje) {
                return 1;
            }
            if (a.puntaje > b.puntaje) {
                return -1;
            }
            return 0;
        });
        for (var i = 0, j = this.nPoblacion - 1; i < nChapas; i++) {
            this.idAcumulativo++;
            var nuevo = new CyberMorty();
            nuevo.id = this.idAcumulativo;
            // se seleccionan los nChapas para la nueva generación
            nuevo.fuerza = this.genAct[j - i].fuerza;
            nuevo.inteligencia = this.genAct[j - i].inteligencia;
            nuevo.resistencia = this.genAct[j - i].resistencia;
            nuevo.salud = RandEntre(1, 10);
            this.genSig.push(nuevo);
        }
        console.log("Primero de cada gen");
        console.log(this.genAct[0]);
    };
    /**
     * Mejorar la forma de seleccion para tener la lista de mejores lo más llena posible. Primero viendo si hay dummies y si no hay entonces si remplazas
     */
    Genetico.prototype.SeleccionarMejores = function () {
        var p;
        var i;
        var parar = 0;
        var a = 0;
        while (a < 9 && !parar) {
            //si hay espacio por que existe un dummy
            if (this.mejores[a].id == -1) {
                //selecciona el mejor morty de la gen act
                this.mejores[a] = this.genAct[this.listaResultados[0].indice];
                parar = 1;
            }
            else {
                // si el mejor de la gen act tiene mejor puntaje que el morty a-esimo mejor
                if (this.genAct[0].puntaje > this.mejores[a].puntaje) {
                    this.SeleccionarMejores[a] = this.genAct[0];
                    parar = 1;
                }
            }
            a++;
        }
    };
    Genetico.prototype.limpiarGenSig = function () {
        for (var individuo in this.genSig) {
            individuo = undefined;
        }
        this.genSig = [];
    };
    Genetico.prototype.imprimirMejores = function () {
        for (var i = 0; i < 9; i++) {
            PonerMorty(i + 1, this.mejores[i]);
        }
    };
    /** psudo pasos para el algoritmo */
    Genetico.prototype.IniciarSimulaciones = function (cruces, mutaciones, chapas) {
        alert("Iniciar las simulaciones");
        this.llenarEventosMorty();
        this.GenCero();
        for (var i = 0; i < this.nGeneraciones; i++) {
            /** proceso de generaciones */
            this.cruzar(cruces);
            this.mutar(mutaciones);
            this.chapas(chapas);
            this.genAct = this.genSig;
            // se reinicia el array;
            this.limpiarGenSig();
            this.calcularAptitud();
            this.SeleccionarMejores();
            /** se repite el proceso n generaciones */
        }
        //se imprimen los resultados
        this.imprimirMejores();
    };
    return Genetico;
}());
;
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
    var card = "<div class='card mb-3' style='max-width: 540px;' > <h5 class='card-title'>CyberMorty " + morty.id + "</h5>" + estadisticas + inventario + eventos;
    div.innerHTML = card;
}
function main() {
    /** Seteo de las variables de las para iniciar el procesamiento */
    /** obtengo las variables de la vista */
    var generaciones = 10; //parseFloat((<HTMLInputElement> document.getElementById("generaciones")).value);
    var individuosPorGen = 10; //parseFloat((<HTMLInputElement> document.getElementById("n-individuos")).value);
    var cruces = 5; //parseFloat((<HTMLInputElement> document.getElementById("mescla")).value);
    var mutaciones = 3; //parseFloat((<HTMLInputElement> document.getElementById("mutacion")).value);
    var chapas = 2; //parseFloat((<HTMLInputElement> document.getElementById("chapa")).value);
    // Inicio de la clase
    var simulacion = new Genetico(10, 10);
    simulacion.conejosDomesticos = 2; //parseFloat((<HTMLInputElement> document.getElementById("ConejoDomestico")).value);
    simulacion.conejosDomesticos = 2; //parseFloat((<HTMLInputElement> document.getElementById("ConejoSalvaje")).value);
    simulacion.tigres = 1; //parseFloat((<HTMLInputElement> document.getElementById("Tigre")).value);
    simulacion.osos = 1; //parseFloat((<HTMLInputElement> document.getElementById("Oso")).value);
    simulacion.lobos = 1; //parseFloat((<HTMLInputElement> document.getElementById("Lobo")).value);
    simulacion.hongos = 2; //parseFloat((<HTMLInputElement> document.getElementById("Hongo")).value);
    simulacion.fuegos = 2; //parseFloat((<HTMLInputElement> document.getElementById("Fuego")).value);
    simulacion.clavos = 1; //parseFloat((<HTMLInputElement> document.getElementById("Clavos")).value);
    simulacion.lanzas = 1; //parseFloat((<HTMLInputElement> document.getElementById("Lanza")).value);
    simulacion.arcos = 1; //parseFloat((<HTMLInputElement> document.getElementById("Arco")).value);
    simulacion.pociones = 1; //parseFloat((<HTMLInputElement> document.getElementById("Pocion")).value);
    simulacion.escudos = 1; //parseFloat((<HTMLInputElement> document.getElementById("Escudo")).value);
    console.log(simulacion);
    /** inicio de las simulacion */
    //simulacion.IniciarSimulaciones(cruces,mutaciones,chapas);
    console.log("hola");
    var CyMort = new CyberMorty();
    /*CyMort.salud = 7;
    CyMort.fuerza=10;
    CyMort.inteligencia=3;
    CyMort.resistencia=5;
    CyMort.inventario.push("ropa");
    CyMort.inventario.push("lanza");
    CyMort.Eventos.push("Saludo a un lobo y este lo mordió");
    CyMort.Eventos.push("Llamo a la llama que llama");
    PonerMorty(2,CyMort);*/
}
