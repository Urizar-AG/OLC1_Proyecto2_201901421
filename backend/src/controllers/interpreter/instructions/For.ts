import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { Break } from "./Break";
import { InsReturn } from "./InsReturn";


//Clase para la sentencia cíclica For
export class For extends Instruction {
    private variableIndice: Instruction; //Variable con la que se itera en el for; for(int i= 0;...)
    private condicion: Expression; //Condicion que evalua el for con la variable indice para decidir si sigue ejecutandose o no; for(int i=0; i<10;...)
    private actualizacionIndice: Instruction; //for(int i=0; i<10; i++)
    private statements: Instruction[]; //Instrucciones declaradas dentro del ciclo for
    constructor(line:number, column:number, variabaleIndice: Instruction, condicion:Expression, actualizacionIndice:Instruction, statements:Instruction[]) {
        super(line, column);
        this.variableIndice = variabaleIndice;
        this.condicion = condicion;
        this.actualizacionIndice = actualizacionIndice;
        this.statements = statements;
    }

    public execute(env: Environment) {
        try {
            let newEnv = new Environment(env);
            newEnv.name = env.name + " - FOR";
            let index = this.variableIndice.execute(newEnv);
            let condition = this.condicion.execute(newEnv);
            if (condition.type !== Type.NULL) {
                while (condition.value) {
                    let newEnv2 = new Environment(newEnv);
                    newEnv2.name = newEnv.name + " - INSIDEFOR";
                    let resultado;
                    for(const i of this.statements) {
                        resultado = i.execute(newEnv2);
                        //La instrucción es un break;
                        if(resultado instanceof Break) {
                            return;
                        }
                        if (i instanceof Break) {
                            return;
                        }
                        if (resultado instanceof InsReturn) {
                            return resultado;
                        }
                    }
                    this.actualizacionIndice.execute(newEnv);
                    condition = this.condicion.execute(newEnv);
                }
            } else {
                console.log('Error Semántico la condición debe ser de tipo Boolean');
            }
        } catch (error) {
            console.log('Error Semántico...Creo')
        }
    }
}