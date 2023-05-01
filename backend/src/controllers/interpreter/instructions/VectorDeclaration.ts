import { Array } from "../abstract/Array";
import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Symbol } from "../abstract/Symbol";

//Clase para el manejo de vectores
export class VectorDeclaration extends Instruction {
    private type1:Type; //tipo que se coloca antes del igual int[] =
    private id: string; //nombre del array
    private type2:Type | null; //tipo que se coloca despues de la palabra new
    private expression:Expression[]; //valor o tamaño del array
    private typeDeclaration:number; // forma de declaracion del vector, 2) int[] vector1 = new int[4]; or 1) int[] vector1 = {10, 5, 1, 890};

    constructor(line:number, column:number, type1:Type, id:string, type2:Type|null, expression:Expression[], typeDeclaration:number) {
        super(line, column);
        this.type1 = type1;
        this.id = id.toLowerCase();
        this.type2 = type2;
        this.expression = expression;
        this.typeDeclaration = typeDeclaration;
    }

    public execute(env: Environment) {
        const array = new Array(); //Se crea el nuevo contenedor de los valores
        if (this.typeDeclaration === 1) {
            let index = 0; //indice que se le asigna al dato dentro del contenedor
            for (const i of this.expression) {
                const expresion = i.execute(env);
                array.setAttribute(index++, new Symbol('', expresion.value, this.type1));
            }    
            env.addVariable(this.line, this.column, this.id, array, this.type1);
        }else {
            if (this.expression.length == 1) {
                const expresion = this.expression[0].execute(env);
                for (let i = 0; i < expresion.value; i++) {
                    array.setAttribute(i, new Symbol('', this.defaultValue(this.type1), this.type1));
                }                    
            }
            else if(this.expression.length == 2) {
                let index = 0;
                for (const i of this.expression) {
                    const expresion = i.execute(env);
                    const tmpArray = new Array();
                    for (let j = 0; j < expresion.value; j++) {
                        tmpArray.setAttribute(j, new Symbol('', this.defaultValue(this.type1), this.type1));
                    }
                    array.setAttribute(index++, new Symbol('', tmpArray, this.type1));
                }
            }
            env.addVariable(this.line, this.column, this.id, array, this.type1);
        }
    }

    //Devuelve el valor por defecto del tipo de dato
    defaultValue(type: number): any {
        let value: any;
        if (type === Type.INT)
            value = 0;
        else if (type === Type.DOUBLE)
            value = 0.0;
        else if (type === Type.CHAR)
            value = '\u0000';
        else if (type === Type.STRING)
            value = "";
        else if (type === Type.BOOLEAN)
            value = true;
        return value
    }
}