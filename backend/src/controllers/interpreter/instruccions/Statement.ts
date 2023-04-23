import { Environment } from "../abstract/Environment";
import { Instruction } from "../abstract/Instruction";


//Clase para las instrucciones de un método/función -> { //instruccions   }
export class Statement extends Instruction {
    private statements: Instruction[]; //Sentencias a ejecutar dentro del método/función
    constructor(line:number, column:number, statements:Instruction[]) {
        super(line, column);
        this.statements = statements;
    }

    public execute(env: Environment) {
        let newEnv = new Environment(env);
        for (const i of this.statements) {
            let resultado = i.execute(newEnv);
            if (resultado != null && resultado != undefined) {
                return resultado;
            }
        }
    }

}
