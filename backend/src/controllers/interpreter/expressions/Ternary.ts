import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para manejar el operador ternario
export class Ternary extends Expression {
    private condition:Expression; //Condición a evaluar en el ternario
    private expression1:Expression; //Valor a retornar si la condicion se cumple
    private expression2:Expression; //Valor a retorna si la condicion no se cumple

    constructor(line:number, column:number, condition:Expression, expression1:Expression, expression2:Expression) {
        super(line, column);
        this.condition = condition;
        this.expression1 = expression1;
        this.expression2 = expression2;
    }

    public execute(env: Environment): Return {
        const condicion = this.condition.execute(env);
        if (condicion.type === Type.BOOLEAN) {
            if (condicion.value) {
                const expresion1 = this.expression1.execute(env);
                return expresion1;
            }else {
                const expresion2 = this.expression2.execute(env);
                return expresion2;
            }
        }
        console.log(`Error Semántico, la condición debe ser de tipo booleana, línea ${this.line} y columna ${this.column}`);
        return { value:null, type:Type.NULL }
    }
}