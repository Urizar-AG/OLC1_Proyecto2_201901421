import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para el casteo de tipos de datos
export class Cast extends Expression {
    public typeConvertion:Type; //Tipo de dato al que se va a convertir la expresión
    public expression:Expression; //Expresión que se quiere castear

    constructor(line:number, column:number, typeConvertion:Type, expression:Expression) {
        super(line, column);
        this.typeConvertion = typeConvertion;
        this.expression = expression;
    }

    public execute(env: Environment): Return {
        try {
            const data = this.expression.execute(env);
            switch (this.typeConvertion) {
                case Type.INT:
                    if (data.type === Type.INT) {
                        return { value:data.value, type:Type.INT }
                    }else if (data.type === Type.DOUBLE) {
                        return { value:parseInt(data.value), type:Type.INT }
                    }else if (data.type === Type.CHAR) {
                        return { value: data.value.charCodeAt(0), type:Type.INT }
                    } else {
                        console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
                        return { value: null, type:Type.NULL }
                    }
                case Type.DOUBLE:
                    if (data.type === Type.INT) {
                        return { value:parseFloat(data.value), type:Type.DOUBLE }
                    }else if (data.type === Type.DOUBLE) {
                        return { value:data.value, type: Type.DOUBLE }
                    }else if (data.type === Type.CHAR) {
                        return { value: parseFloat(data.value.charCodeAt(0)), type: Type.DOUBLE }
                    } else {
                        console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
                        return { value: null, type:Type.NULL }
                    }
                case Type.CHAR:
                    if (data.type === Type.INT) {
                        return { value:String.fromCharCode(data.value), type:Type.CHAR }
                    }else if(data.type === Type.CHAR){
                        return { value:data.value , type:data.type }
                    }else {
                        console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
                        return { value:null , type:Type.NULL }
                    }
                case Type.STRING:
                    console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
                    return { value:null , type:Type.NULL }
                case Type.BOOLEAN:
                    console.log(`Error Semántico, casteo no válido, línea ${this.line} y columna ${this.column}`);
                    return { value:null, type:Type.NULL }
                default:
                    console.log(`Error Semántico, no es posible hacer el casteo, línea ${this.line} y columna ${this.column}`);
                    return { value:null, type:Type.NULL}
            }
        } catch (error) {
            console.log(error);
            return { value:null, type:Type.NULL}
        }
    }
}