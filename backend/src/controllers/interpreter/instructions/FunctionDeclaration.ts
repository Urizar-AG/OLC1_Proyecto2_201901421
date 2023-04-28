import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";

/*
    Clase para declaración de funciones y funciones sin retorno (métodos)
    Funciones con y sin parámetro
*/

export class MethodFunction extends Instruction {
    public typeFunction: Type; //Tipo de la función (int, double, boolean...)
    public id: string; //Nombre de la función
    public parameters: Expression[]; //Parametros del método
    public statements: Instruction; //Instrucciones declaradas dentro del método

    constructor(line:number, column:number, typeFunction:Type, id:string, parameters:Expression[], statements: Instruction) {
        super(line, column);
        this.typeFunction = typeFunction;
        this.id = id.toLowerCase();
        this.parameters = parameters;
        this.statements = statements
    }

    public execute(env: Environment) {
        env.addMethodFunction(this.line, this.column, this.id, this);
    }
}