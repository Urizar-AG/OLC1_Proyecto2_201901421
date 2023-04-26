import { Environment } from "../abstract/Environment";
import { Expression } from "../abstract/Expression";
import { Return, Type } from "../abstract/Return";
import { InsReturn } from "../instructions/InsReturn";

//Clase para manejar la llamada de funciones
export class FunctionCall extends Expression {
    private id: string; //id del parámetro
    private args: Expression[]; //listado de argumentos que recibe la función

    constructor(line:number, column:number, id:string, args:Expression[]) {
        super(line, column);
        this.id = id.toLowerCase();
        this.args = args;
    }

    public execute(env: Environment): any {
        let funcion = env.getMethodFunction(this.id);
        if (funcion != null) {
            let newEnv = new Environment(env.getGlobalEnvironment())
            //Verifica que se cumpla la misma cantidad de parámetros
            if (funcion.parameters?.length === this.args.length) {
                //Verifica los parámetros contra los argumentos
                for (let i = 0; i < funcion.parameters.length; i++) {
                    //Ejecuta el parámetro, el argumento y guarda el resultado
                    let param = funcion.parameters[i].execute(env);
                    
                    let argum = this.args[i].execute(env);
                    
                    if (param.type === argum.type) {
                        newEnv.addVariable(this.line, this.column, param.value, argum.value, argum.type)
                    }else {
                        console.log(`Error Semántico, el tipo de dato no coincide, línea ${this.line} y columna ${this.column}`);
                    }
                }
                //Ejecuta el cuerpo de la función
                let res = funcion.statements.execute(newEnv);
                if (res instanceof InsReturn) {
                    if (funcion.typeFunction === res.typeReturn) {
                        return res.valueReturn;
                    }else{
                        console.log(`Error Semántico, el tipo de función no coincide con el tipo de retorno,línea ${this.line} y coulumna ${this.column}`);
                        return { value:null, type:Type.NULL }
                    }
                }
            }else {
                console.log(`Error Semántico, cantidad de argumentos != cantidad de parámetros, línea ${this.line} y columna ${this.column}`)
            }
        }else {
            console.log(`Error Semántico, la función no existe ${this.line} y columna ${this.column}`);
            
        }
    }
}