import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Break } from "./Break";
import { InsReturn } from "./InsReturn";

//Clase para la sentencia de control Switch
export class Switch extends Instruction {

    private evaluate: Expression; //Expresión a evaluar en el switch
    private cases: Instruction[] | null; //cases y default declarados dentro del switch
    private def: Instruction | null; //cases y default declarados dentro del switch
    constructor(line:number, column:number, evaluate:Expression, cases:Instruction[] | null, def:Instruction | null) {
        super(line, column);
        this.evaluate = evaluate;
        this.cases = cases;
        this.def = def;
    }

    public execute(env: Environment) {
        const condition = this.evaluate.execute(env);
        let coincidencia = false; //Hizo match con algún Case
        if (condition.type !== Type.NULL) {
            //Si vienen instrucciones case declaradas en el Switch
            if (this.cases) {
                //Recorriendo la lista de Case
                for (let i of this.cases) {
                    if (i instanceof Case) {
                        let caseCondition = i.execute(env); //Ejecuta la condición evaluda en el "Case"
                        if (condition.type === caseCondition?.type) {
                            //Ejecuta si se cumple la condición del "Case"
                            if (condition.value == caseCondition.value) {
                                let newEnv = new Environment(env);
                                for (const j of i.statement) {
                                    const resultado = j.execute(newEnv);
                                    
                                    //La instrucción es un break
                                    if (resultado instanceof Break || j instanceof Break) {
                                        coincidencia = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }else{
                        console.log('Error Semántico dendro de la sentencia de control switch, falta Case');
                        break;
                    }
                    if(coincidencia){break}
                }
            }
            //Caso Default
            if(coincidencia === false && this.def) {
                if (this.def instanceof DefaultCase) {
                    let instruccionesDefault = this.def.execute(env); //Obtiene las declaradas dentro del Default
                    if (instruccionesDefault) {
                        let newEnv = new Environment(env);
                        //Ejecuta las instruccions del Default
                        for (const j of instruccionesDefault) {
                            const resultado = j.execute(newEnv);
                            //La instrucción es un break
                            if (resultado instanceof Break || j instanceof Break) {
                                break;
                            }
                            if (resultado instanceof InsReturn) {
                                return resultado;
                            }
                        }    
                    }
                }
            }
        }else 
        {
            console.log('Error Semántico en la sentencia de control switch');
        }

    }
}

//Clase Case para la instrucción "Case" que tiene el Switch
export class Case extends Instruction {
    private evaluate: Expression; //Condición a comparar con la expresión a evaluar que recibe el switch
    public statement: Instruction[] //Instrucciones a ejecutar dentro del case

    constructor(line:number, column:number, evaluate:Expression, statement:Instruction[]) {
        super(line, column);
        this.evaluate = evaluate;
        this.statement = statement;
    }

    public execute(env: Environment) {
        if (this.evaluate) {
            const resultado = this.evaluate.execute(env);
            return resultado;
        }
    }
}

//Clase DefaultCase para la instrucción "Default" que tiene el Switch
export class DefaultCase extends Instruction {
    public statement: Instruction[] | null | undefined; //Instruccion a ejecutar dentro del case

    constructor(line:number, column:number, statement:Instruction[] | null | undefined) {
        super(line, column);
        this.statement = statement;
    }

    public execute(env: Environment) {
        //Devuelve las instruccions para que puedan ser ejecutadas por el Switch
        return this.statement;
    }
}