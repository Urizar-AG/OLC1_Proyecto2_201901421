/* Tipo de dato primitivo */
export enum Type {
    INT = 0,
    DOUBLE = 1,
    CHAR = 2,
    STRING = 3,
    BOOLEAN = 4,
    NULL = 5,
    VOID = 6 // Para los funciones sin retorno/métodos
}

/* Recupera el tipo de dato primitivo */
export function getType(tipo:Type) {
    switch (tipo) {
        case 0:
            return "INT";
        case 1:
            return "DOUBLE"
        case 2:
            return "CHAR";
        case 3:
            return "STRING";
        case 4:
            return "BOOLEAN";
        case 5:
            return "NULL";
        case 6:
            return "VOID"
        default:
            return "-";
    }
}

/* Tipo de operación aritmética */
export enum ArithmeticOperator {
    SUMA = 0,
    RESTA = 1,
    MULTIPLICACION = 2,
    DIVISION = 3,
    POTENCIA = 4,
    MODULO = 5,
    NEGATIVO = 6,
}

/* Tipo de operación relacional */
export enum RelationalOperator {
    IGUAL = 0,
    NOIGUAL = 1,
    MENOR = 2,
    MENORIGUAL = 3,
    MAYOR = 4,
    MAYORIGUAL = 5,
}

/* Tipo de operación relacional */
export enum LogicalOperator {
    OR = 0,
    AND = 1,
    NOT = 2,
}

export type Return = {
    value: any,
    type: Type
}