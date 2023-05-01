import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type, getType } from "../abstract/Return";
import { Symbol } from "../abstract/Symbol";

//Clase para manejar el agregar valores a una la lista
export class InsAdd extends Instruction {
    private id:string; //Id de la lista
    private value:Expression; //Valor a agregar a la lista

    constructor(line:number, column:number, id:string, value:Expression) {
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public execute(env: Environment) {
        //Obtiene la lista a la que se quiere agregar valores
        let variable = env.getVariable(this.id); 
        if (variable == null) {
            console.log(`Error Semántico, no se encontro la variable, ${this.line} y columna ${this.column}`);
        }else {
            const nuevoValor = this.value.execute(env);
            if (variable.typePrimitive === nuevoValor.type) {
                if (variable?.value instanceof Object) {
                    const newSymbol = new Symbol('', nuevoValor.value, nuevoValor.type); //Crea el nuevo valor a agregar a la lista
                    variable.value.pushAttribute(newSymbol); //Agrega el nuevo valor a la lista
                }
            } 
            else {
                console.log(`Error Semántico, ${getType(nuevoValor.type)} no puede ser agregado a ${getType(variable.typePrimitive)}, línea ${this.line} y columna ${this.column}`);
            }
        }
    }
}