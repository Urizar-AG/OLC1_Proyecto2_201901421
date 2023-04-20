import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Break } from "./Break";

//Clase para sentencia de control If
export class If extends Instruction {
    private condition: Expression; //Condición a evaluar para ejecutar o no el if
    private ifStatement: Instruction[]; //Instrucciones de la sentencia if
    private elseStatement: Instruction[] | Instruction | null; //Instrucciones de la sentencia else

    constructor(line:number, column:number, condition:Expression, ifStatement:Instruction[], elseStatement:Instruction[] | Instruction | null) {
        super(line, column);
        this.condition = condition;
        this.ifStatement = ifStatement;
        this.elseStatement = elseStatement;
    }

    public execute(env: Environment) {
        const condition = this.condition.execute(env);
        //La condición no es de tipo Boolean, no se puede evaluar el if
        if (condition.type !== Type.BOOLEAN) {
            console.log('Error Semántico, la condición debe ser de tipo Boolean');
            return;
        }
        //La condición es de tipo Boolean

        //No hay una sentencia else
        if (!this.elseStatement) {
            let newEnvironment = new Environment(env); 
            //Si se cumple la condición se ejecuta el if
            if (condition.value) {
                for (const i of this.ifStatement) {
                    let resultado = i.execute(newEnvironment);
                    if(resultado instanceof Break) {
                        return resultado;
                    }
                    if (i instanceof Break) {
                        return i;
                    }
                }
            }
        }
        //Si existe una sentencia else
        else {
            let newEnvironment = new Environment(env);
            //Se cumple la condición del IF
            if (condition.value) {
                let resultado;
                for (const i of this.ifStatement) {
                    resultado = i.execute(newEnvironment);
                    if(resultado instanceof Break) {
                        return resultado;
                    }
                    if (i instanceof Break) {
                        return i;
                    }
                }
            }
            //No se cumple el if, ejecuta la sentencia else leída
            else {
                if (this.elseStatement) {
                    //Si elseStatement no es un arreglo, se ejecuta el else directamente
                    if (!Array.isArray(this.elseStatement)) {
                        let resultado = this.elseStatement.execute(env);
                        if (resultado instanceof Break) {
                            return resultado;
                        }
                    }
                    //El elseStatement si es un arreglo
                    else {
                        let newEnvironment2 =  new Environment(newEnvironment);
                        let resultado;
                        for (const i of this.elseStatement) {
                            resultado = i.execute(newEnvironment);
                            if(resultado instanceof Break) {
                                return resultado;
                            }
                            if (i instanceof Break) {
                                return i;
                            }
                        }
                    }

                }
            }
        }
    }

}



