import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";

export class Main extends Instruction {
    public statement: Expression;
    constructor(line:number, column:number, statement: Expression) {
        super(line, column);
        this.statement = statement;
    }

    public execute(env: Environment) {
        this.statement.execute(env);
    }
}