import { Environment } from "../abstract/Environment";
import { Instruction } from "../abstract/Instruction";
import { Type } from "../abstract/Return";
import { InsReturn } from "./InsReturn";


//Clase para las instrucciones de un método/función -> { //instruccions   }
export class Statement extends Instruction {
    private statements: Instruction[]; //Sentencias a ejecutar dentro del método/función
    constructor(line:number, column:number, statements:Instruction[]) {
        super(line, column);
        this.statements = statements;
    }

    public execute(env: Environment) {
        let newEnv = new Environment(env);
        newEnv.name = newEnv.prev?.name + "";
        // newEnv.name = env.name + " - INSTRUCCIONES";
        
        for (const i of this.statements) {
            let resultado = i.execute(newEnv);
            if (i instanceof InsReturn) {
                return i;
            }
            if (resultado instanceof InsReturn) {
                return resultado;
            }
            if (resultado != null && resultado != undefined) {
                return resultado;
            }
        }
    }

}
