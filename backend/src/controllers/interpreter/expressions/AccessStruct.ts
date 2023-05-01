import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { Symbol } from "../abstract/Symbol";


//Clase para manejar el acceso a un vector o a una lista
export class AccessStruct extends Expression {
    private id:string; //Id del vector o lista
    private index:Expression; //Índice de la posición a la que se quiere acceder

    constructor(line:number, column:number, id:string, index:Expression) {
        super(line, column);
        this.id = id.toLowerCase();
        this.index = index;
    }

    public execute(env: Environment): Return {
        let variable = env.getVariable(this.id);
        const index = this.index.execute(env);
        if (index.type !== Type.INT) {
            console.log(`Error Semántico, índice debe ser numerico, línea ${this.line} y columna ${this.column}`);
            return { value:null, type:Type.NULL };
        }else {
            //Verifica que el valor del id sea el arreglo
            if (variable?.value instanceof Object) {
                const valor = variable?.value.getAttribute(index.value as number) as Symbol; //Obtiene el valor de la posición;
                if (valor) {
                    return { value:valor.value, type:valor.typePrimitive }
                }else {
                    console.log(`Error Semántico, índice debe ser numerico, línea ${this.line} y columna ${this.column}`);
                    return { value:null, type:Type.NULL };
                }
            }
            return { value:null, type:Type.NULL };
        }
    }
}