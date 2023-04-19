import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Return, Type } from "../abstract/Return";


export class IncrementDecrement extends Expression {

    private id: string; // Id de la variable a modificar
    private operator: string; // si es ++ o --
    constructor(line:number, column:number, id:string, operator:string) {
        super(line, column);
        this.id = id.toLowerCase();
        this.operator = operator;
    }

    public execute(env: Environment): Return {
        let resultado:Return;

        let variable = env.getVariable(this.id);
        if (variable == null) {
            console.log('Error Semántico, la variable no existe');
            return resultado = { value:0 , type:Type.NULL }
        }else {
            //La variable existe y es de tipo numerica
            if (variable.typePrimitive == Type.INT || variable.typePrimitive == Type.DOUBLE) {
                const valor = variable.value;
                if (this.operator === "++") {
                    env.updateVariable(this.id, variable.value += 1);
                }else {
                    env.updateVariable(this.id, variable.value -= 1);
                }              
                return resultado = { value:variable.value, type:variable.typePrimitive }                  
            }
            //La variable existe pero no es de tipo numerico
            else {
                return resultado = { value:0, type:Type.NULL}
            }
        }

    }
}