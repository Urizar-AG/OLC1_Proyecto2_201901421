import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";

//Clase para parámetro de las funciones/métodos
export class Parameter extends Expression {
    private typeParameter: Type; //Tipo del parámetro
    private id: string; //Id del parámetro
    constructor(line:number, column:number, typeParameter:Type, id:string) {
        super(line, column);
        this.typeParameter = typeParameter;
        this.id = id.toLowerCase();
    }
    
    public execute(env: Environment): Return {
        return { value:this.id, type:this.typeParameter}
    }
}