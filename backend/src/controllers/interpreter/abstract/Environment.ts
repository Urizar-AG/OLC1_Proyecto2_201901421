import { Symbol } from "./Symbol";
import { Type } from "./Return";
import { Instruction } from "./Instruction";
import { MethodFunction } from "../instructions/FunctionDeclaration";

//Clase para manejar el entorno de las variables, métodos, funciones...
export class Environment {

    private variables = new Map<string, Symbol>(); //Mapa donde se guardan las variables pertenecientes al ámbito creado
    private methodsFunctions = new Map<string, MethodFunction>(); //Mapa donde se guardan las funciones y métodos

    private prev: Environment | null; //Referencia a entorno anterior
    constructor(prev: Environment | null) {
        this.variables = new Map<string, Symbol>();  
        this.prev = prev;  
    }

    //Devuelve el entorno global
    public getGlobalEnvironment(): Environment {
        let env: Environment | null = this;
        while (env.prev !== null) {
            env = env.prev;
        }
        return env;
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

    public addMethodFunction(id:string, func:MethodFunction) {
        let env: Environment | null = this;
        if (!env.methodsFunctions.has(id.toLowerCase())) {
            //No existe ninguna función o método con ese nombre, se guarda
            env.methodsFunctions.set(id, func);
        }else {
            console.log(`Error Semántico, la función ${id} ya existe en el entorno`)
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

    public getMethodFunction(id: string):MethodFunction | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.methodsFunctions.has(id)) {
                //Encontro la variable, devuelve un objeto tipo Symbol -> Ejemplo Symbol { id:"x", value:4, type:TYPE.INT }
                return env.methodsFunctions.get(id);
            }
            env = env.prev;
        }
        //No encontró la variable en ningun entorno
        return null;        
    }

    //Actualiza el valor de una variable
    public updateVariable(id: string, value:any) {
        let env: Environment | null = this;
        //Buscando la variable en los entornos
        while (env != null) {
            if (env.variables.has(id)) {
                //La variable existe en el entorno, se asignar el valor                
                let variable = env.variables.get(id);
                if (variable == null) {
                    console.log("Error Semántico, la variable no existe");
                    return;
                }else {
                    variable.value =  value;
                    return;
                }
            }
            env = env.prev;
        }
    }
}