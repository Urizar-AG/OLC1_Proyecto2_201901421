/* Tipo de dato primitivo */
export enum Type {
    INT = 0,
    DOUBLE = 1,
    CHAR = 2,
    STRING = 3,
    BOOLEAN = 4,
    NULL = 5

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


export type Return = {
    value: any,
    type: Type
}