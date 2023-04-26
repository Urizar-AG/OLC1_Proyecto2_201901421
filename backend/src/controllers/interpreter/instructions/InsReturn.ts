import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Return, Type } from "../abstract/Return";

//Clase para la instrucción "return" del lenguaje
export class InsReturn extends Instruction {
    public value: Expression | null; //Valor a retorna
    public typeReturn: Type; //Si solamente es el return, sin ningun valor
    public valueReturn: Return;
    constructor(line:number, column:number, value:Expression | null, typeReturn: Type) {
        super(line, column);
        this.value = value;
        this.typeReturn = typeReturn;
        this.valueReturn = {value:0, type: Type.VOID}
    }

    public execute(env: Environment) {
        //Tiene un valor para retornar
        if (this.value !== null) {
            let resultado = this.value.execute(env);
            if (resultado != null) {
                this.typeReturn = resultado.type;
                this.valueReturn = resultado;
            }
        }
        return this;
    }
}