import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para manejar la función nativa para convertir a mayúscula o minúscula
export class ToLowerUpper extends Expression {
    public expression:Expression;  //Expresion a convertir
    public lowerOrUpper:number; //0 debe hacer toLower, 1 debe hacer toUpper

    constructor(line:number, column:number, expression:Expression, lowerOrUpper:number) {
        super(line, column);
        this.expression = expression;
        this.lowerOrUpper = lowerOrUpper;
    }

    public execute(env: Environment): Return {
        let value = this.expression.execute(env);
        if (value.type === Type.STRING) {
            if (this.lowerOrUpper === 0) {
                return { value: value.value.toLowerCase(), type:Type.STRING }
            }
            return { value: value.value.toUpperCase(), type:Type.STRING }
        }
        console.log(`Error Semántico, ToLowerUpper no es de tipo STRING, línea ${this.line} y columna ${this.column}`)
        return { value:null, type:Type.NULL }
    }
}