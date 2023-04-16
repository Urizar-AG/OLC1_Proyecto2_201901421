import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

export class Primitive extends Expression {
    private value: any;
    private primitiveType: Type;
    constructor(line: number, column: number, value: any, primitiveType: Type) {
        super(line, column);
        this.value = value;
        this.primitiveType = primitiveType;
    }

    public execute(): Return {
        switch (this.primitiveType) {
            case Type.INT:
                return { value:parseInt(this.value), type:Type.INT };
            case Type.DOUBLE:
                return { value:parseFloat(this.value), type:Type.DOUBLE };
            case Type.CHAR:
                return { value:this.value, type:Type.CHAR };
            case Type.STRING:
                return { value:this.value, type:Type.STRING };
            case Type.BOOLEAN:
                if (this.value.toString().toLowerCase() === "true") {
                    return { value:true, type:Type.BOOLEAN };
                }
                return {value:false, type:Type.BOOLEAN};
            default:
                return { value:null, type: Type.NULL };
        }
    }
}