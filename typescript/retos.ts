
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

export interface Reto{
	
    interactuar(morty:CyberMorty): void;
}



export class ConejoDomestico implements Reto{



	constructor() {
	
		let nombre = "Conejo Domestico";
	}

    interactuar(morty:CyberMorty){
        
    	morty.Eventos.push("Morty " + morty.id + " se comió al conejo y tomó su piel");
    	morty.inventario.push("piel de conejo");

    }

}


export class ConejoSalvaje implements Reto{



	constructor() {
	
		let nombre = "Conejo Salvaje";
	}

    interactuar(morty:CyberMorty){
        

    	let saludConejo = 6;
    	let ataqueConejo = 3 - morty.resistencia;
    	if(ataqueConejo < 0){
    		ataqueConejo = 0;
    	}

    	do{
    		saludConejo = saludConejo - morty.fuerza;
    		morty.salud = morty.salud - ataqueConejo;

    	}while(saludConejo > 0  && morty.salud > 0);

    	if(saludConejo <= 0){
    		morty.Eventos.push("Morty " + morty.id + " lucho contra el Conejo Salvaje y lo asesinó");
    	}


    	//manejar muerte de morty

    }

}



export class Tigre implements Reto{



	constructor() {
	
		let nombre = "Tigre";
	}

    interactuar(morty:CyberMorty){
        

    	let saludTigre = 25;
    	let ataqueTigre = 13 - morty.resistencia;
    	if(ataqueTigre < 0){
    		ataqueTigre = 0;
    	}

    	do{
    		saludTigre = saludTigre - morty.fuerza;
    		morty.salud = morty.salud - ataqueTigre;

    	}while(saludTigre > 0  && morty.salud > 0);

    	if(saludTigre <= 0){
    		morty.Eventos.push("Morty " + morty.id + " lucho contra el Tigre Feroz y lo asesinó");
    	}


    	//manejar muerte de morty

    }

}



export class Oso implements Reto{



	constructor() {
	
		let nombre = "Oso";
	}

    interactuar(morty:CyberMorty){
        
 

    	let saludOso = 35;
    	let ataqueOso = 16 - morty.resistencia;
    	if(ataqueOso < 0){
    		ataqueOso = 0;
    	}

    	do{
    		saludOso = saludOso - morty.fuerza;
    		morty.salud = morty.salud - ataqueOso;

    	}while(saludOso > 0  && morty.salud > 0);

    	if(saludOso <= 0){
    		morty.Eventos.push("Morty " + morty.id + " lucho contra el Oso y lo asesinó");
    	}


    }

}




export class Lobo implements Reto{



    constructor() {
    
        let nombre = "Lobo";
    }

    interactuar(morty:CyberMorty){
        
 

        let saludLobo = 35;
        let ataqueLobo = 16 - morty.resistencia;
        if(ataqueLobo < 0){
            ataqueLobo = 0;
        }

        do{
            saludLobo = saludLobo - morty.fuerza;
            morty.salud = morty.salud - ataqueLobo;

        }while(saludLobo > 0  && morty.salud > 0);

        if(saludLobo <= 0){
            morty.Eventos.push("Morty " + morty.id + " lucho contra el Lobo y lo asesinó");
        }


    }

}


export class Hongo implements Reto{



	constructor() {
	
		let nombre = "Hongo";
	}

    interactuar(morty:CyberMorty){
        
    	if(morty.inteligencia > 6){

	    	morty.Eventos.push("Morty " + morty.id + " guardó un hongo");
	    	morty.inventario.push("Hongo");

    	}else{

	    	morty.Eventos.push("Morty " + morty.id + " se comió el hongo y perdió vida");
	    	morty.salud = morty.salud - 3;

    	}

    }

}


export class Fuego implements Reto{



	constructor() {
	
		let nombre = "Fuego";
	}

    interactuar(morty:CyberMorty){
        
    	if(morty.inteligencia > 7){

	    	morty.Eventos.push("Morty " + morty.id + " observa el fuego");

    	}else{

	    	morty.Eventos.push("Morty " + morty.id + " se quemó con el fuego");
	    	morty.salud = morty.salud - 8;

    	}

    }

}


export class Clavos implements Reto{



	constructor() {
	
		let nombre = "Clavos";
	}

    interactuar(morty:CyberMorty){
        

    	if(morty.inteligencia > 5){

	    	morty.Eventos.push("Morty " + morty.id + " guardó unos clavos peligrosos");
	    	morty.inventario.push("Clavos");

    	}else{

	    	morty.Eventos.push("Morty " + morty.id + " pisó unos clavos y se lastimó");
	    	morty.salud = morty.salud - 3;

    	}

    }

}


export class Lanza implements Reto{



	constructor() {
	
		let nombre = "Lanza";
	}

    interactuar(morty:CyberMorty){
        

    	morty.Eventos.push("Morty " + morty.id + " enconró una lanza y ahora tiene más fuerza");
    	morty.inventario.push("Lanza");
    	morty.fuerza = morty.fuerza + 3;


    }

}

export class Arco implements Reto{



	constructor() {
	
		let nombre = "Arco y Flechas";
	}

    interactuar(morty:CyberMorty){
        

    	morty.Eventos.push("Morty " + morty.id + " encontró un arco con flechas y ahora tiene más fuerza");
    	morty.inventario.push("Arco y flechas");
    	morty.fuerza = morty.fuerza + 5;

    }

}

export class Pocion implements Reto{



	constructor() {
	
		let nombre = "Poción";
	}

    interactuar(morty:CyberMorty){
        

    	morty.Eventos.push("Morty " + morty.id + " bebió una poción que aumentó su salud");
    	morty.salud = 15;

    }

}

export class Escudo implements Reto{



	constructor() {
	
		let nombre = "Escudo";
	}

    interactuar(morty:CyberMorty){
        

    	morty.Eventos.push("Morty " + morty.id + " encontró un escudo y ahora tiene más resistencia");
    	morty.inventario.push("Escudo");
    	morty.resistencia = morty.resistencia + 10;

    }

}
