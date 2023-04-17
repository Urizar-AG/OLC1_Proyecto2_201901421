import { Return, Type } from "./Return";

// Clase para crear/guardar variables
export class Symbol {
    public id: string;
    public value: any;
    public typePrimitive: Type

    constructor(id:string, value:any, type: Type) {
        this.id = id.toLowerCase();
        this.value = value;
        this.typePrimitive = type;
    }
}