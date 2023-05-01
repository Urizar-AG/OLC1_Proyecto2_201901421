import { Array } from "../abstract/Array";
import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";

//Clase para el manejo de listas
export class ListDeclaration extends Instruction{
    private type1:Type; //Declaracion del tipo que se hace antes del "="
    private id:string; //Id de la lista
    private type2:Type; //Declaración del tipo que se hace después del "="

    constructor(line:number, column:number, type1:Type, id:string, type2:Type) {
        super(line, column);
        this.type1 = type1;
        this.id = id; 
        this.type2 = type2; 
    }

    public execute(env: Environment) {
        const array = new Array();
        if (this.type1 === this.type2) { //verifica que los tipos en la declaración sean los mismos
            env.addVariable(this.line, this.column, this.id, array, this.type1);
        }else {
            console.log(`Error Semántico, los tipos deben ser los mismos, línea ${this.line} y columna ${this.column}`);
            return { value:null, type:Type.NULL}
        }
    }
}