import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para la función nativa de TypeWise, truncate
export class Truncate extends Expression {
    private expression:Expression;

    constructor(line:number, column:number, expression:Expression) {
        super(line, column);
        this.expression = expression;
    }

    public execute(env: Environment): Return {
        const expresion = this.expression.execute(env);
        if (expresion.type === Type.INT || expresion.type === Type.DOUBLE) {
            const valor = Math.trunc(expresion.value)
            return { value:valor, type:Type.INT}
        }
        console.log(`Error Semántico, truncate debe ser de tipo numérico, línea ${this.line} y columna ${this.column}`);
        return { value:null, type:Type.NULL }
    }
}