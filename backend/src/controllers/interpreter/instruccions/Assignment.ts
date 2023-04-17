import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";

//Clase que sirve para asignar/reasignar un valor a una variable
export class Assignment extends Instruction {

    private id: string; //Id de la variable a asignar/reasignar
    private value: Expression; //Valor a asignar a la variable
    constructor(line:number, column:number, id:string, value:Expression) {
        super(line, column);
        this.id = id.toLowerCase();
        this.value = value;
    }

    public execute(env: Environment) {
        const nuevoValor = this.value.execute(env);
        if(nuevoValor.type === Type.NULL) {
            console.log("Error Semántico");
            return;
        }

        let variable = env.getVariable(this.id);
        if (variable == null) {
            console.log("Error Semántico, la variable no existe")
        }else {
            if (variable.typePrimitive === nuevoValor.type) {
                //El tipo de dato coincide con el tipo de variable, se puede asignar el valor
                env.updateVariable(this.id, nuevoValor.value);
            } else {
                console.log(`Error Semántico, ${nuevoValor.type} no puede ser asignado a ${variable.typePrimitive}`);
            }
        }

    }
}