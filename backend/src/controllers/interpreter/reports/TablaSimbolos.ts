//Clase para manejar los símbolos y generar el reporte de la tabla de símbolos

export class TSymbol {
    public id:string; //Identificador (nombre) del símbolo
    public type1:string; //Variable o Función/Método
    public type2:string; //Tipo de dato; int, double, string...
    public entorno:string; //Nombre del entorno al que pertenece
    public line:number; //Línea donde se encontro el símbolo
    public column:number; //Columna donde se encontro  el símbolo

    constructor(id:string, type1:string, type2:string, entorno:string, line:number, column:number) {
        this.id = id;
        this.type1 = type1;
        this.type2 = type2;
        this.entorno = entorno;
        this.line = line;
        this.column = column;
    }
}

export let TablaSimbolos:Array<TSymbol> = []