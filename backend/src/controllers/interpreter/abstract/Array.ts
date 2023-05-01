import { Symbol } from "./Symbol";

//Guarda los valores del vector
export class Array {
    public values:Symbol[];

    constructor() {
        this.values = [];
    }

    public getAttribute(index:number) {
        return this.values[index];
    }

    public setAttribute(index:number, value:Symbol) {
        this.values[index] = value;
    }

    //Método de añadir para cuando el array se utiliza para una lista
    public pushAttribute(value:Symbol) {
        this.values.push(value);
    }
}