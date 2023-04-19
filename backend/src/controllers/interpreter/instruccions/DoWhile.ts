import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";

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
                for (const i of this.statements) {
                    i.execute(newEnv);
                }
                c = this.condition.execute(newEnv);
            } while (c.value);
        }else {
            console.log('Error Semántico, la condición de la instrucción do-while debe ser boolena');
        }

    }
}