import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { InsReturn } from "./InsReturn";

//Clase para la sentencia cíclica Do-While
export class DoWhile extends Instruction {
    private statements: Instruction[]; //Sentencias declaradas dentro del do;
    private condition: Expression; //Expresión evaluada por el while
    constructor(line:number, column:number, statements:Instruction[], condition:Expression) {
        super(line, column);
        this.statements = statements;
        this.condition = condition;
    }

    public execute(env: Environment) {
        let c = this.condition.execute(env);
        if (c.type !== Type.NULL) {
            do {
                let newEnv = new Environment(env);
                newEnv.name = env.name + " - DOWHILE";
                let resultado;
                for (const i of this.statements) {
                    resultado = i.execute(newEnv);
                    if(resultado instanceof Break) {
                        return;
                    }
                    if (i instanceof Break) {
                        return;
                    }
                    if (resultado instanceof InsReturn) {
                        return resultado;
                    }
                    if (resultado instanceof Continue || i instanceof Continue) {
                        console.log(resultado);
                        console.log(i);
                        //Al romper el for, se salta la iteración del dowhile
                        break;
                    }
                }
                c = this.condition.execute(newEnv);
            } while (c.value);
        }else {
            console.log('Error Semántico, la condición de la instrucción do-while debe ser boolean');
        }

    }
}