import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Symbol } from "../abstract/Symbol";

//Clase para manejar la asignación de valores en los vectores o en las listas
export class AssignmentStruct extends Instruction {
    private id:string; //Id del vector o lista al que se quiere acceder
    private index:Expression; //Posición del vector o lista a la que se quiere acceder
    private value:Expression; //Valor a asignar en la posición

    constructor(line:number, column:number, id:string, index:Expression, value:Expression) {
        super(line, column);
        this.id = id.toLowerCase();
        this.index = index;
        this.value = value;
    }

    public execute(env: Environment) {
         //Obtiene el nuevo valor a asignar en el arreglo
        const nuevoValor = this.value.execute(env);
        if(nuevoValor.type === Type.NULL) {
            console.log(`Error Semántico, falta valor a asignar, línea ${this.line} y columna ${this.column}`);
            return;
        }
        
        //Obtiene el vector al que se quiere acceder
        let variable = env.getVariable(this.id); 
        if (variable == null) {
            console.log(`Error Semántico, no se encontro la variable ${this.line} y columna ${this.column}`);
        }else {
            if (variable.typePrimitive === nuevoValor.type) {
                const index = this.index.execute(env);
                if (variable?.value instanceof Object) {
                    const valor = variable?.value.getAttribute(index.value as number) as Symbol; //Obtiene la posición buscada del arreglo
                    if (valor) {
                        const newSymbol = new Symbol('', nuevoValor.value, nuevoValor.type); //Crea el nuevo valor a asignar en la posición
                        variable?.value.setAttribute(index.value as number, newSymbol);//Lo actualiza o agrega el valor en el array
                    }else {
                        console.log(`Error Semántico, índice fuera de rango, línea ${this.line} y columna ${this.column}`);
                        return { value:null, type:Type.NULL };
                    }
                }
            } 
            else {
                console.log(`Error Semántico, ${nuevoValor.type} no puede ser asignado a ${variable.typePrimitive}, línea ${this.line} y columna ${this.column}`);
            }
        }
    }
}