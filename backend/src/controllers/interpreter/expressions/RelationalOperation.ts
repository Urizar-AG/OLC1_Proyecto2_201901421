import { Expression } from "../abstract/Expression";
import { RelationalOperator, Return, Type } from "../abstract/Return";

export class RelationalOperation extends Expression {
    private operando1: Expression;
    private operando2: Expression;
    private operationType: RelationalOperator;

    constructor(line:number, column:number, operando1:Expression, operando2:Expression, operationType:RelationalOperator) {
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
            case RelationalOperator.IGUAL:
                return resultado = this.igualdad(opr1, opr2);
            case RelationalOperator.NOIGUAL:
                return resultado = this.noIgualdad(opr1, opr2);
            case RelationalOperator.MENOR:
                return resultado = this.menorQue(opr1, opr2);
            case RelationalOperator.MENORIGUAL:
                return resultado = this.menorIgual(opr1, opr2);
            case RelationalOperator.MAYOR:
                return resultado = this.mayorQue(opr1, opr2);
            case RelationalOperator.MAYORIGUAL:
                return resultado = this.mayorIgual(opr1, opr2);
            default:
                return resultado = { value:"Error Semántico, Operación no valida", type:Type.NULL }
        }
    }

    igualdad(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value === operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) === parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int === Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value === res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int === String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value === parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value === operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double === Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value === res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double === String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean === Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean === Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value === operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean === Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean === String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res === operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 === operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char === Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 === res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char === String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String === Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String === Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String === Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String === Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String === String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la igualdad", type:Type.NULL }
        }
    }

    noIgualdad(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value !== operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) !== parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int !== Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value !== res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int !== String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value !== parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value !== operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double !== Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value !== res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double !== String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean !== Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean !== Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value !== operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean !== Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean !== String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res !== operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 !== operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char !== Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 !== res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char !== String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String !== Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String !== Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String !== Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String !== Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String !== String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la noIgualdad", type:Type.NULL }
        }
    }

    menorQue(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value < operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) < parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int < Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value < res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int < String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value < parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value < operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double < Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value < res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double < String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean < Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean < Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value < operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean < Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean < String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res < operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 < operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char < Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 < res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char < String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String < Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String < Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String < Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String < Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String < String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la menorQue", type:Type.NULL }
        }
    }

    menorIgual(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value <= operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) <= parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int <= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value <= res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int <= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value <= parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value <= operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double <= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value <= res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double <= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean <= Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean <= Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value <= operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean <= Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean <= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res <= operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 <= operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char <= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 <= res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char <= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String <= Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String <= Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String <= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String <= Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String <= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la menorIgual", type:Type.NULL }
        }
    }

    mayorQue(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value > operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) > parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int > Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value > res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int > String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value > parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value > operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double > Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value > res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double > String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean > Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean > Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value > operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean > Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean > String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res > operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 > operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char > Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 > res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char > String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String > Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String > Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String > Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String > Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String > String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la mayorQue", type:Type.NULL }
        }
    }

    mayorIgual(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value >= operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) >= parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int >= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value >= res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Int >= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value >= parseFloat(operando2.value), type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        return { value:operando1.value >= operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double >= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value >= res, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Double >= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean >= Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean >= Double", type:Type.NULL } 
                    case Type.BOOLEAN:
                        return { value:operando1.value >= operando2.value, type:Type.BOOLEAN }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean >= Char", type:Type.NULL } 
                    case Type.STRING:
                        return { value:"Error Semántico Boolean >= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res >= operando2.value, type:Type.BOOLEAN }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 >= operando2.value, type:Type.BOOLEAN }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char >= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value;
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value;
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 >= res4, type:Type.BOOLEAN }
                    case Type.STRING:
                        return { value:"Error Semántico Char >= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String >= Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String >= Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String >= Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String >= Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String >= String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la mayorQue", type:Type.NULL }
        }
    }
}