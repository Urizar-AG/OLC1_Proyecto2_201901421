import { Environment } from "../abstract/Environment";
import { Instruction } from "../abstract/Instruction";

export class Break extends Instruction {
    constructor(line:number, column:number) {
        super(line, column);
    }

    public execute(env: Environment) {
        return;
    }
}