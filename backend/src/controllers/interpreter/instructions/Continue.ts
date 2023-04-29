import { Environment } from "../abstract/Environment";
import { Instruction } from "../abstract/Instruction";

//Clase para manejar la instrucción continue del lenguaje
export class Continue extends Instruction {
    constructor(line:number, column:number) {
        super(line, column);
    }

    public execute(env: Environment) {
        return;
    }
}