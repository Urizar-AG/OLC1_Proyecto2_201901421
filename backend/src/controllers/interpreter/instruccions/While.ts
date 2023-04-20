import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Break } from "./Break";

//Clase para la sentencia cíclica While
export class While extends Instruction {
    private condition: Expression; //Condition evaluada por el while
    private statements: Instruction []; //Instrucciones a ejecutar dentro del while
    constructor(line:number, column:number, condition:Expression, statements:Instruction[]) {
       super(line, column);
       this.condition = condition;
       this.statements = statements; 
    }

    public execute(env: Environment) {
        let condicion =  this.condition.execute(env);
        if (condicion.type === Type.NULL) {
            console.log('Error Semántico, la condición de la instrucción while debe ser de tipo boolean');
        }
        
        while (condicion.value) {
            let newEnvironment = new Environment(env);
            let resultado;
            for (const i of this.statements) {
                resultado = i.execute(newEnvironment);
                //La instrucción es un break
                if(resultado instanceof Break) {
                    return;
                }
                if (i instanceof Break) {
                    return;
                }
            }
            // this.statement.execute(newEnvironment);
            condicion = this.condition.execute(newEnvironment); //Actualiza el estado de la condición
        }
    }
}