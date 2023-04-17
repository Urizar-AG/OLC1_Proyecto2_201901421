import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Type, Return } from "../abstract/Return";

//Clase para acceder a las variables declaradas
export class Access extends Expression {
    private id: string;//Id de la variable que se está llamando
    constructor(line:number, column:number, id:string) {
        super(line, column);
        this.id = id.toLowerCase();
    }

    /* Su método execute se encarga de llamar al método para buscar la variable en los entornos
       si la encuentra devuelve el valor y el tipo
       si no la encuentra devuelve un error
    */
    public execute(env: Environment): Return {
        let resultado: Return;
        let variable = env.getVariable(this.id);
        if (variable == null) {
            resultado = { value:"Error Semántico, variable no encontrada", type:Type.NULL }
            return resultado;
        }
        resultado = { value:variable.value, type:variable.typePrimitive }
        return resultado;
    }
}