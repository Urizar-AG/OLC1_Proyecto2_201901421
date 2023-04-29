import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type, getType } from "../abstract/Return";

//Clase para la función nativa de TypeWise, typeof
export class Typeof extends Expression {
    private expression:Expression;

    constructor(line:number, column:number, expression:Expression) {
        super(line, column);
        this.expression = expression;
    }

    public execute(env: Environment): Return {
        const expresion = this.expression.execute(env);
        if (expresion.type !== Type.NULL) {
            switch (expresion.type) {
                case Type.INT:
                    return { value:"INT", type:Type.STRING }
                case Type.DOUBLE:
                    return { value:"DOUBLE", type:Type.STRING }
                case Type.CHAR:
                    return { value:"CHAR", type:Type.STRING }
                case Type.STRING:
                    return { value:"STRING", type:Type.STRING }
                case Type.BOOLEAN:
                    return { value:"BOOLEAN", type:Type.STRING }
                default:
                    console.log(`Error Semántico, typeof no valido, línea ${this.line} y columna ${this.column}`);
                    return { value:null, type:Type.NULL }
            }
        }
        console.log(`Error Semántico, typeof no valido, línea ${this.line} y columna ${this.column}`);
        return { value:null, type:Type.NULL }
    }
}