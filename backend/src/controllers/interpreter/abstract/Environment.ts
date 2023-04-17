import { Symbol } from "./Symbol";
import { Type } from "./Return";

//Clase para manejar el entorno de las variables, métodos, funciones...
export class Environment {

    private variables = new Map<string, Symbol>(); //Mapa donde se guardan las variables pertenecientes al ámbito creado
    private prev: Environment | null; //Referencia a entorno anterior
    constructor(prev: Environment | null) {
        this.variables = new Map<string, Symbol>();  
        this.prev = prev;  
    }

    //Agregar una nueva variable al entorno
    public addVariable(line:number, column:number, id: string, value: any, type: Type) {
        //verifica el ámbito
        let env: Environment | null = this;

        if (!env.variables.has(id.toLowerCase())) {
            //La variable no existe dentro del ámbito se puede crear
            env.variables.set(id.toLowerCase(), new Symbol(id, value, type));
        }else {
            console.log(`Error la variable ya existe en el entorno, línea ${line} y columna ${column}`)
        }
    }

    //Busca una variable por id en todos los entornos
    public getVariable(id: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env !== null) {
            if (env.variables.has(id)) {
                //Encontro la variable, devuelve un objeto tipo Symbol -> Ejemplo Symbol { id:"x", value:4, type:TYPE.INT }
                return env.variables.get(id);
            }
            env = env.prev;
        }
        //No encontró la variable en ningun entorno
        return null;
    }
}