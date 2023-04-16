import { Expression } from "../abstract/Expression";
import { LogicalOperator, Return, Type } from "../abstract/Return";

export class LogicalOperation extends Expression {
    private operando1: Expression;
    private operando2: Expression;
    private operationType: LogicalOperator;

    constructor(line:number, column:number, operando1:Expression, operando2:Expression, operationType:LogicalOperator) {
        super(line, column);
        this.operando1 = operando1;
        this.operando2 = operando2;
        this.operationType = operationType;
    }

    public execute(): Return {
        let resultado: Return;
        let opr1 = this.operando1.execute();
        let opr2 = this.operando2.execute();
        switch (this.operationType) {
            case LogicalOperator.OR:
                return resultado = this.or(opr1, opr2);
            case LogicalOperator.AND:
                return resultado = this.and(opr1, opr2);
            case LogicalOperator.NOT:
                return resultado = this.not(opr1, opr2);
            default:
                return resultado = { value:"Error Semántico, Operación no valida", type:Type.NULL }
        }
    }

    or(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        if (opr1 === Type.BOOLEAN && opr2 === Type.BOOLEAN) {
            return { value:operando1.value || operando2.value, type: Type.BOOLEAN }
        }
        return { value:"Error Semántico", type:Type.NULL }
    }

    and(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        if (opr1 === Type.BOOLEAN && opr2 === Type.BOOLEAN) {
            return { value:operando1.value && operando2.value, type: Type.BOOLEAN }
        }
        return { value:"Error Semántico", type:Type.NULL }
    }

    not(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        if (opr1 === Type.BOOLEAN) {
            return { value:!operando1.value, type: Type.BOOLEAN }
        }
        return { value:"Error Semántico", type:Type.NULL }    
    }
}