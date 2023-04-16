import { Expression } from "../abstract/Expression";
import { Return, ArithmeticOperator, Type } from "../abstract/Return";

export class ArithmeticOperation extends Expression {
    private operando1: Expression;
    private operando2: Expression;
    private operationType: ArithmeticOperator;

    constructor(line:number, column:number, operando1:Expression, operando2:Expression, operationType:ArithmeticOperator) {
        super(line, column);
        this.operando1 = operando1;
        this.operando2 = operando2;
        this.operationType = operationType;
    }

    public execute(): Return {
        let resultado: Return
        let opr1 = this.operando1.execute();
        let opr2 = this.operando2.execute();
        switch (this.operationType) {
            case ArithmeticOperator.SUMA:
                return resultado = this.suma(opr1, opr2);
            case ArithmeticOperator.RESTA:
                return resultado = this.resta(opr1, opr2);
            case ArithmeticOperator.MULTIPLICACION:
                return resultado = this.multiplicacion(opr1, opr2);
            case ArithmeticOperator.DIVISION:
                return resultado = this.division(opr1, opr2);
            case ArithmeticOperator.POTENCIA:
                return resultado = this.potencia(opr1, opr2);
            case ArithmeticOperator.MODULO:
                return resultado = this.modulo(opr1, opr2);
            case ArithmeticOperator.NEGATIVO:
                return resultado = this.negativo(opr1);
            default:
                return resultado = { value:"Error Semántico, Operación no valida", type:Type.NULL }
        }
    }

    suma(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value + operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) + parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        if (operando2.value) {
                            return { value:operando1.value + 1, type:Type.INT }
                        }
                        return { value:operando1.value, type:Type.INT }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value + res, type:Type.INT }
                    case Type.STRING:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value + parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value + operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        if (operando2.value) {
                            return { value:operando1.value + 1, type:Type.DOUBLE }
                        }
                        return { value:operando1.value, type:Type.DOUBLE }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value + res, type:Type.DOUBLE }
                    case Type.STRING:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        if (operando1.value) {
                            return { value:operando2.value + 1, type:Type.INT }
                        }
                        return { value:operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        if (operando1.value) {
                            return { value:operando2.value + 1, type:Type.DOUBLE }
                        }
                        return { value:operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean + Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean + Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res + operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 + operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char + Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux3 = operando1.value
                        let res3 = aux3.charCodeAt(0);
                        let aux4 = operando2.value
                        let res4 = aux4.charCodeAt(0);
                        return { value:res3 + res4, type:Type.STRING }
                    case Type.STRING:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    case Type.DOUBLE:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    case Type.BOOLEAN:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    case Type.CHAR:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    case Type.STRING:
                        return { value:operando1.value + '' + operando2.value, type:Type.STRING }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la suma", type:Type.NULL }
        }
    }

    resta(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value - operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        return { value:operando1.value - operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        if (operando2.value) {
                            return { value:operando1.value - 1, type:Type.INT }
                        }
                        return { value:operando1.value, type:Type.INT }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value - res, type:Type.INT }
                    case Type.STRING:
                        return { value:"Error Semántico Int - String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value - parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value - operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        if (operando2.value) {
                            return { value:operando1.value - 1, type:Type.DOUBLE }
                        }
                        return { value:operando1.value, type:Type.DOUBLE }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value - res, type:Type.DOUBLE }
                    case Type.STRING:
                        return { value:"Error Semántico Double - String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        if (operando1.value) {
                            return { value:operando2.value - 1, type:Type.INT }
                        }
                        return { value:operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        if (operando1.value) {
                            return { value:operando2.value - 1, type:Type.DOUBLE }
                        }
                        return { value:operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean - Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean - Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Boolean - String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res - operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 - operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char - Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Char - Boolean", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Char - Char", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String - Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String - Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String - Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String - Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String - String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la resta", type:Type.NULL }
        }
    }

    multiplicacion(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value * operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) * parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int * Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value * res, type:Type.INT }
                    case Type.STRING:
                        return { value:"Error Semántico Int * String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value * parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value * operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double - Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value * res, type:Type.DOUBLE }
                    case Type.STRING:
                        return { value:"Error Semántico Double * String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean * Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean * Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean * Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean * Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Boolean * String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res * operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:res2 * operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char * Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Char * Boolean", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Char * Char", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String * Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String * Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String * Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String * Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String * String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la multiplicación", type:Type.NULL }
        }
    }

    division(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        if (operando2.value !== 0) {
                            return { value:operando1.value / operando2.value, type:Type.INT }
                        }
                        return { value:"Error Semántico división entre 0", type:Type.NULL }
                    case Type.DOUBLE:
                        if (operando2.value !== 0) {
                            return { value:parseFloat(operando1.value) / parseFloat(operando2.value), type:Type.DOUBLE }
                        }
                        return { value:"Error Semántico división entre 0", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int / Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value / res, type:Type.INT }
                    case Type.STRING:
                        return { value:"Error Semántico Int / String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value / parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value / operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double / Boolean", type:Type.NULL }
                    case Type.CHAR:
                        let aux = operando2.value
                        let res = aux.charCodeAt(0);
                        return { value:operando1.value / res, type:Type.DOUBLE }
                    case Type.STRING:
                        return { value:"Error Semántico Double / String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean / Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean / Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean / Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean / Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Boolean / String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        let aux = operando1.value;
                        let res = aux.charCodeAt(0);
                        return { value:res / operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        let aux2 = operando1.value;
                        let res2 = aux2.charCodeAt(0);
                        return { value:parseFloat(res2) / operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char / Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Char / Boolean", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Char / Char", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String / Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String / Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String / Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String / Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String / String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la multiplicación", type:Type.NULL }
        }
    }
    
    potencia(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value ** operando2.value, type:Type.INT }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) ** parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int ** Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Int ** Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Int ** String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value ** parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value ** operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double ** Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Double ** Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Double ** String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean ** Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean ** Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean ** Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean ** Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Boolean ** String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Char ** Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Char ** Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char ** Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Char ** Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Char ** String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String ** Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String ** Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String ** Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String ** Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String ** String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en la potencia", type:Type.NULL }
        }
    }

    modulo(operando1:any, operando2:any) {
        let opr1 = operando1.type;
        let opr2 = operando2.type;
        switch (opr1) {
            case Type.INT:
                switch (opr2) {
                    case Type.INT:
                        return { value:parseFloat(operando1.value) % parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:parseFloat(operando1.value) % parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Int % Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Int % Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Int % String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.DOUBLE:
                switch (opr2) {
                    case Type.INT:
                        return { value:operando1.value % parseFloat(operando2.value), type:Type.DOUBLE }
                    case Type.DOUBLE:
                        return { value:operando1.value % operando2.value, type:Type.DOUBLE }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Double % Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Double % Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Double % String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.BOOLEAN:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Boolean % Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Boolean % Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Boolean % Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Boolean % Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Boolean % String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                } 
            case Type.CHAR:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico Char % Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico Char % Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico Char % Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico Char % Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico Char % String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }
            case Type.STRING:
                switch (opr2) {
                    case Type.INT:
                        return { value:"Error Semántico String % Int", type:Type.NULL }
                    case Type.DOUBLE:
                        return { value:"Error Semántico String % Double", type:Type.NULL }
                    case Type.BOOLEAN:
                        return { value:"Error Semántico String % Boolean", type:Type.NULL }
                    case Type.CHAR:
                        return { value:"Error Semántico String % Char", type:Type.NULL }
                    case Type.STRING:
                        return { value:"Error Semántico String % String", type:Type.NULL }
                    default:
                        return { value:"Error Semántico", type:Type.NULL }    
                }                
            default:
                return { value:"Error Semántico en el módulo", type:Type.NULL }
        }
    }
    
    negativo(operando1:any) {
        let opr1 = operando1.type;
        switch (opr1) {
            case Type.INT:
                return { value:operando1.value * -1, type:Type.INT }
            case Type.DOUBLE:
                return { value:operando1.value * -1, type:Type.DOUBLE }
            case Type.BOOLEAN:
                return { value:"Error Semántico", type:Type.NULL }    
            case Type.CHAR:
                return { value:"Error Semántico", type:Type.NULL }    
            case Type.STRING:
                return { value:"Error Semántico", type:Type.NULL }    
            default:
                return { value:"Error Semántico en la negación unaria", type:Type.NULL }
        }
    }
}
