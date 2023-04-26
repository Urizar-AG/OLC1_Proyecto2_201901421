import { Instruction } from "../abstract/Instruction";
import { Expression } from "../abstract/Expression";
import { Environment } from "../abstract/Environment";
import { Type } from "../abstract/Return";

/*
    Clase para declaración de variables
    #int x = 0;
    #double y;
*/
export class VariableDeclaration extends Instruction {

    private id: string;
    private typePrimitve: Type;
    private value: Expression | null;
    constructor(line:number, column:number, id:string, value:Expression | null, typePrimitive:Type) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.typePrimitve= typePrimitive;
    }

    public execute(env: Environment): any {
        if (this.value !== null) {
            //La variable fue declarada e inicializada
            // console.log(this.value)
            const value = this.value.execute(env); //Recupera el valor que retorne la expresión que fue asignada a la variable
            // console.log(value)
            if (this.typePrimitve === value.type) {
                env.addVariable(this.line, this.column, this.id, value.value, this.typePrimitve);
            }else {
                console.log(`Error Semántico, ${value.type} no puede ser asignado a ${this.typePrimitve}`);
            }
        }else {
            //La variable solo fue declarada, se inicializa con un valor por defecto
            switch (this.typePrimitve) {
                case Type.INT:
                    env.addVariable(this.line, this.column, this.id, 0, this.typePrimitve);
                    break;
                case Type.DOUBLE:
                    env.addVariable(this.line, this.column, this.id, 0.0, this.typePrimitve);    
                    break;
                case Type.BOOLEAN:
                    env.addVariable(this.line, this.column, this.id, true, this.typePrimitve);
                    break;
                case Type.CHAR:
                    env.addVariable(this.line, this.column, this.id, '\u0000', this.typePrimitve);
                    break;
                case Type.STRING:
                    env.addVariable(this.line, this.column, this.id, "", this.typePrimitve);
                    break;
                default:
                    console.log("Error Semántico, declaración no válida")
                    break;
            }
        }
    }
}