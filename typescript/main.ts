import { ConejoDomestico, ConejoSalvaje, Lobo, Hongo, Fuego, Clavos, Lanza, Arco, Pocion, Escudo, Tigre, Oso } from "./retos";
/************************ HERRAMIENTAS    */
/*import * as Collections from 'typescript-collections';*/
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}


function RandEntre(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function tieneLanza(lanza)
{return lanza ==="Lanza";}
function tieneArco(arco)
{return arco ==="Arco";}
function tieneEscudo(escudo)
{return escudo==="Escudo"}


/** clase para nodo morty */
class CyberMorty
{
    id:number=-1;
    salud:number=-1;
    fuerza:number=-1;
    resistencia:number=-1;
    inteligencia:number=-1;

    inventario:string[]=[];
    Eventos:string[]=[];

    puntaje:number;

}

class puntaje
{
    indice:number=0;
    puntaje:number=0;
}


class Genetico
{
    /**Variables de cantidad*/
    nPoblacion:number;
    nEventos:number;

    /** cantidad de eventos de cada tipo */
    conejosDomesticos:number;
    conejosSalvajes:number;
    tigres:number;
    osos:number;
    lobos:number;
    hongos:number;
    fuegos:number;
    clavos:number;
    lanzas:number;
    arcos:number;
    pociones:number;
    escudos:number

    totalEventos:number;

    idAcumulativo:number=-1;

    /** listas de inventarios, eventos e individuos */
    //listaInventario:Inventario[]=[];
    listaEventos:Reto[]=[];
    listaResultados:puntaje[]=[]

    genAct:CyberMorty[]=[];
    genSig:CyberMorty[]=[];
    mejores:CyberMorty[]=[];

    constructor(poblacion:number)
    {
        this.nPoblacion=poblacion;

        // llena el vector de resultados

        for(var _i = 0; _i<poblacion;_i++)
        {
            let nuevoCalculo= new puntaje();
            this.listaResultados.push(nuevoCalculo);
        }
        //inicializacion del array de los 9 mejores mortys de todas las generaciones
        for(var a=0; a<9;a++)
        {
            let nuevo= new CyberMorty();
            this.mejores.push(nuevo);
        }
    }

    /** LLenar el vector de Eventos*/
    llenarEventosMorty()
    {
        for(var a=0 ;a< this.conejosDomesticos;a++)
        {
            let evnt = new ConejoDomestico();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.conejosSalvajes;a++)
        {
            let evnt = new ConejoSalvaje();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.tigres;a++)
        {
            let evnt = new Tigre();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.osos;a++)
        {
            let evnt = new Oso();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.lobos;a++)
        {
            let evnt = new Lobo();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.hongos;a++)
        {
            let evnt = new Hongo();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.fuegos;a++)
        {
            let evnt = new Fuego();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.clavos;a++)
        {
            let evnt = new Clavos();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.lanzas;a++)
        {
            let evnt = new Lanza();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.arcos;a++)
        {
            let evnt = new Arco();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.pociones;a++)
        {
            let evnt = new Pocion();
            this.listaEventos.push(evnt);
        }

        for(var a=0 ;a< this.escudos;a++)
        {
            let evnt = new Escudo();
            this.listaEventos.push(evnt);
        }
    }

    /** Generacion inicial*/
    GenCero()
    {
        for (let  i =0; i<this.nPoblacion;i++)
        {
            this.idAcumulativo++;
            let nuevo = new CyberMorty();
            nuevo.id=this.idAcumulativo;
            //SE USAN VALORES ENTRE 1 Y 10 EN TODAS LAS STATS
            nuevo.salud = RandEntre(1,10);
            nuevo.fuerza = RandEntre(1,10);
            nuevo.resistencia = RandEntre(1,10);
            nuevo.inteligencia = RandEntre(1,10);
            this.genAct.push(nuevo);
        }
    }


    /** aptitud de la gen actual **/
    calcularAptitud()
    {
        for(let a=0;a<this.nPoblacion;a++ )
        {
            for(let i=0;i<this.nEventos;i++)
            {
                let iRand= RandEntre(0,this.totalEventos);
                // si sigue vivo entonces se enfrenta a un nuevo evento
                if(this.genAct[a].salud>0)
                {
                    this.listaEventos[iRand].interactuar(this.genAct[a]);
                }
                
            }
            let puntaje = this.genAct[a].salud;
            puntaje+=20 - this.genAct[a].fuerza;
            puntaje+=20 - this.genAct[a].resistencia;
            puntaje+=20 - this.genAct[a].inteligencia;

            console.log(this.genAct[a].inventario.find(tieneLanza));
            //if(this.genAct[a].inventario.find(tieneLanza)
            /** falta: falta probar la funcion de find para ajustar el puntaje */
            if(this.genAct[a].salud<1){puntaje-=20;}

            this.genAct[a].puntaje=puntaje;
        }
    }

    /** cruzar los Mortys y guardarlos en genSig*/
    cruzar( nCruces:number)
    {

        let padre:number;
        let madre:number;
        for (let i = 0; i< nCruces;i++)
        {
            this.idAcumulativo++;
            // nuevo individuo
            let nuevo=new CyberMorty();
            nuevo.id=this.idAcumulativo;

            // se escojen 2 padres aleatorios
            padre=RandEntre(0,this.nPoblacion-1);
            madre= RandEntre(0,this.nPoblacion-1);

            if(RandEntre(0,1))
            {
                nuevo.salud = this.genAct[padre].salud;
            }else{
                nuevo.salud = this.genAct[madre].salud;
            }

            if(RandEntre(0,1))
            {
                nuevo.fuerza = this.genAct[padre].fuerza;
            }else{
                nuevo.fuerza = this.genAct[madre].fuerza;
            }

            if(RandEntre(0,1))
            {
                nuevo.resistencia = this.genAct[padre].resistencia;
            }else{
                nuevo.resistencia = this.genAct[madre].resistencia;
            }

            if(RandEntre(0,1))
            {
                nuevo.inteligencia = this.genAct[padre].inteligencia;
            }else{
                nuevo.inteligencia = this.genAct[madre].inteligencia;
            }
  

            this.genSig.push(nuevo);
        }
    }

    /** muta cierta cantidad de Mortys **/
    mutar(nMutaciones:number)
    {

        let j;// para escoger un individuo

        for (let i:number = 0; i< nMutaciones; i++)
        {
            this.idAcumulativo++;
            // nuevo individuo mutado
            let nuevo= new CyberMorty();
            nuevo.id=this.idAcumulativo;


            j= RandEntre(0,this.nPoblacion-1);

            /** genera una mutación del 20% en salud **/
            if(RandEntre(0,1) && Math.floor(this.genAct[j].salud*1.20) < 20)// 20 es el valor maximo
            {
                nuevo.salud= Math.floor(this.genAct[j].salud*1.20);
            }
            else
            {
                nuevo.salud= Math.floor(this.genAct[j].salud*0.8);
            }

            /** genera una mutación del 20% en fuerza **/
            if(RandEntre(0,1) && Math.floor(this.genAct[j].fuerza*1.10) < 20)// 20 es el valor maximo
            {
                nuevo.fuerza= Math.floor(this.genAct[j].fuerza*1.10);
            }
            else
            {
                nuevo.fuerza= Math.floor(this.genAct[j].fuerza*0.8);
            }


            /** genera una mutación del 20% en resistencia**/
            if(RandEntre(0,1) && Math.floor(this.genAct[j].resistencia*1.20) < 20)// 20 es el valor maximo
            {
                nuevo.resistencia= Math.floor(this.genAct[j].resistencia*1.20);
            }
            else
            {
                nuevo.resistencia= Math.floor(this.genAct[j].resistencia*0.8);
            }

            /** genera una mutación del 20% en inteligencia**/
            if(RandEntre(0,1) && Math.floor(this.genAct[j].inteligencia*1.20) < 10)// 10 es el valor maximo
            {
                nuevo.inteligencia= Math.floor(this.genAct[j].inteligencia*1.20);
            }
            else
            {
                nuevo.inteligencia= Math.floor(this.genAct[j].inteligencia*0.8);
            }

            this.genSig.push(nuevo);
        }

    }

    /** método que selecciona lo que tienen estadisticas mas bajas **/
    chapas(nChapas)
    {
        // primero se ordenan los mortys
        this.genAct.sort(
            function(a:CyberMorty,b:CyberMorty)
            {
                if(a.puntaje<b.puntaje)
                {
                    return 1;
                }
                if(a.puntaje >b.puntaje)
                {
                    return -1;
                }
                return 0;
            }
        );

        for(let i= 0, j= this.nPoblacion-1; i<nChapas;i++)
        {
            this.idAcumulativo++;
            let nuevo= new CyberMorty();
            nuevo.id=this.idAcumulativo;
            // se seleccionan los nChapas para la nueva generación
            nuevo.fuerza=this.genAct[j-i].fuerza;
            nuevo.inteligencia=this.genAct[j-i].inteligencia;
            nuevo.resistencia=this.genAct[j-i].resistencia;
            nuevo.salud= RandEntre(1,10);
            this.genSig.push(nuevo);
        }
    }


    /**
     * Mejorar la forma de seleccion para tener la lista de mejores lo más llena posible. Primero viendo si hay dummies y si no hay entonces si remplazas
     */
    SeleccionarMejores()
    {
        let p;
        let i;
        let parar= 0;
        let a=0;
        while( a<9 && !parar)
        {
            //si hay espacio por que existe un dummy
            if(this.mejores[a].id == -1)
            {
                //selecciona el mejor morty de la gen act
                this.mejores[a]=this.genAct[this.listaResultados[0].indice];
                parar=1;
            }else{

                // si el mejor de la gen act tiene mejor puntaje que el morty a-esimo mejor
                if(this.genAct[0].puntaje > this.mejores[a].puntaje)
                {
                    this.SeleccionarMejores[a]=this.genAct[0];
                    parar=1;
                }
            }
            a++;
        }
    }


    limpiarGenSig()
    {
        for( let individuo in this.genSig)
        {
            individuo= undefined;
        }
        this.genSig=[];
    }

    imprimirMejores()
    {
        for(let i=0;i<9;i++)
        {
            PonerMorty(i+1,this.mejores[i]);
        }
    }

    /** psudo pasos para el algoritmo */
    CalcularPuntos( cruces:number, mutaciones:number,  chapas:number, generaciones:number)
    {
        //se sacan todos los parametors de condiguracion de la vista
       this.conejosDomesticos = parseFloat((<HTMLInputElement> document.getElementById("conejo")).value);
       /** falta: faltan parametros por obtener de la vista */
    
       this.llenarEventosMorty();

       this.GenCero();
       for(let i=0;i< generaciones;i++)
       {
           /** proceso de generaciones */
           this.cruzar(cruces);
           this.mutar(mutaciones);
           this.chapas(chapas);

           this.genAct=this.genSig;

           // se reinicia el array;
           this.limpiarGenSig();
           
           this.calcularAptitud();
           this.SeleccionarMejores();

           /** se repite el proceso n generaciones */
       }

       //se imprimen los resultados
       this.imprimirMejores();
    }


};

function PonerMorty(indice:number, morty:CyberMorty)
{
    let fila= Math.floor(indice/3)+1;
    let columna:number = indice%3
    if (columna==0)
    {
        columna= 3;
    } 

    /** transicion de espera */
    let div = document.getElementById(fila+"-"+columna);
    div.innerHTML="<div class='spinner-grow' role='status'> <span class='sr-only'>Loading...</span> </div>";

    //sleep(1000);

    /** imagen y estadisticas */
    let img="<div class='col-md-4'><img src='img/cyborg-m.svg' class='card-img' alt='Cyborg'></div>";
    let estadisticasInicio="<div class='col-md-8'><div class='card-body'><ul>";
    let estadisticasFinal="<ul></div></div></div>";

    let salud= "<li>Salud: "+morty.salud+"</li>";
    let fuerza= "<li>fuerza: "+morty.fuerza+"</li>";
    let resistencia= "<li>Resistencia: "+morty.resistencia+"</li>";
    let inteligencia= "<li>Inteligencia: "+morty.inteligencia+"</li>";
    
    let estadisticas="<div class='row no-gutters'>"+img+estadisticasInicio+salud+fuerza+resistencia+inteligencia+estadisticasFinal;
    /** Inventario */
    let objetos="";
    for(let objeto of morty.inventario)
    {
        objetos+=objeto+",";
    }
    let inventario= "<ul class='list-group list-group-flush'><li class='list-group-item'><h6 class='card-title'>Inventario</h6><p>"+objetos+"</p></li>";

    /** Eventos */
    let evnts="";
    for(let even of morty.Eventos)
    {
        evnts+="<li>"+even+"</li>";
    }
    let eventos="<li class='list-group-item'><h6 class='card-title'>Eventos</h6><ul>"+evnts+"</ul></li></ul>";

    let card="<div class='card mb-3' style='max-width: 540px;' > <h5 class='card-title'>CyberMorty "+morty.id+"</h5>"+estadisticas+inventario+eventos;

    div.innerHTML= card;
}




function main()
{
    let CyMort= new CyberMorty();
    CyMort.salud = 7;
    CyMort.fuerza=10;
    CyMort.inteligencia=3;
    CyMort.resistencia=5;

    CyMort.inventario.push("ropa");
    CyMort.inventario.push("lanza");

    CyMort.Eventos.push("Saludo a un lobo y este lo mordió");
    CyMort.Eventos.push("Llamo a la llama que llama");

    PonerMorty(2,CyMort);
}


