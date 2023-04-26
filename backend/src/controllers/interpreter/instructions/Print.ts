import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { PrintList } from "../reports/PrintList";

export class Print extends Instruction {
    private expression: Expression;

    constructor(line: number, column: number, expression: Expression) {
        super(line, column);
        this.expression = expression;
    }

    public execute(env: Environment): void {
        const value = this.expression.execute(env);
        console.log(value.value);
        PrintList.push(value.value); //Almacena el resultado en la lista de prints
    }
}