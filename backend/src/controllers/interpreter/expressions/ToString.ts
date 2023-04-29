import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para convertir datos numericos y booleanos a String
export class ToString extends Expression {
    public expression:Expression;

    constructor(line:number, column:number, expression:Expression) {
        super(line, column);
        this.expression = expression;
    }
    
    public execute(env: Environment): Return {
        let data = this.expression.execute(env);
        if (data.type === Type.INT) {
            return { value:data.value + "", type:Type.STRING }
        }else if(data.type === Type.DOUBLE) {
            return { value:data.value + "", type:Type.STRING }
        }else if(data.type === Type.STRING) {
            return { value:data.value, type:Type.STRING }
        }else if(data.type === Type.BOOLEAN) {
            if (data.value) {
                return { value:"true", type:Type.STRING }
            }
            return { value:"false", type:Type.STRING }
        }
        else {
            console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
            return { value:null , type:Type.NULL }
        }
    }
}