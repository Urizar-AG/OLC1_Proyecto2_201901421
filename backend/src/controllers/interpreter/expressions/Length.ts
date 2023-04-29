import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para calcular la longitud de una cadena, vector y lista
export class Length extends Expression{
    private expression:Expression;

    constructor(line:number, column:number, expression:Expression) {
        super(line, column);
        this.expression = expression;
    }

    public execute(env: Environment): Return {
        const expresion = this.expression.execute(env);
        if (expresion.type === Type.STRING) {
            return { value:expresion.value.length, type:Type.INT }
        }
        return { value:null, type:Type.NULL }
    }
}