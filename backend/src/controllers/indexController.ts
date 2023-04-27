import { Request, Response } from "express";
import { Environment } from "./interpreter/abstract/Environment";
import { MethodFunction } from "./interpreter/instructions/FunctionDeclaration";
import { PrintList } from "./interpreter/reports/PrintList";
import { ListaErrores } from "./interpreter/reports/Error";
import { VariableDeclaration } from "./interpreter/instructions/VariableDeclaration";
import { Main } from "./interpreter/instructions/Main";
import { Graficador} from "./interpreter/reports/Graficador";

import { writeFile } from "fs/promises";
import { exec } from "child_process";
import open, {openApp, apps} from 'open';

let codigoDot:string = "";

class IndexCrontroller {

    //Método de prueba
    public test(req: Request, res: Response) {
        res.send('Hello World');
    }

    public interpretar(req: Request, res: Response) {
        try {
            /* =============== INTÉRPRETE =============== */
            console.log('Interpretando... \n')
            ListaErrores.splice(0, ListaErrores.length);
            let parser = require("./interpreter/grammar/grammar");
            //Recupera el código enviando desde el frontend y lo manda al parser
            let code = req.body.code; 
            const ast = parser.parse(code);
            PrintList.splice(0, PrintList.length);
            const globalEnvironment = new Environment(null);


            //Recorre una vez para guardar las declaraciones de métodos y funciones
            for (const inst of ast) {
                if (inst instanceof MethodFunction) {
                    inst.execute(globalEnvironment);
                }else if (inst instanceof VariableDeclaration) {
                    inst.execute(globalEnvironment);
                }
            }

            //Recorre la segunda vez para ejecutar el código
            for(const inst of ast) {
                if (inst instanceof Main) {
                    // continue;
                    inst.execute(globalEnvironment);
                }
            }

            /* =============== GENERACIÓN DE ÁRBOL AST =============== */
            try {
                let arbol = require("./interpreter/grammar/grammarAST");
                const resultado = arbol.parse(code);
                const arbolAST = resultado.data;
                const dot = Graficador(arbolAST);
                codigoDot = dot;
                // console.log(dot);
            } catch (error) {
                console.log('Ha ocurrido un error al generar el árbol AST')
                console.log(error);
            }

            /* =============== RESPUESTA AL FRONTEND =============== */
            if (ListaErrores.length !== 0) {
                console.log('errores encontrados')
                let data = "";
                for (const i of ListaErrores) {
                    let aux:string = "Error " + i.errorType + ", " + i.description + ", en la línea " + i.linea + " y columna " + i.colum;
                    data += aux;
                    data += "\n";
                }
                res.json({
                    consola: data,
                    errores: true
                });
            }else {
                //Respuesta que se envia al backend si todo salio bien
                res.json({
                    consola: PrintList.join('\n'),
                    errores: false
                });
            }
        } catch (error) {
            console.log('Ha ocurrido un error al analizar el código');
            console.log(error);
            if (ListaErrores.length !== 0) {
                let data = "";
                for (const i of ListaErrores) {
                    let aux:string = "Error " + i.errorType + ", " + i.description + ", en la línea " + i.linea + " y columna " + i.colum;
                    data += aux;
                    data += "\n";
                }
                res.json({
                    consola: data,
                    errores: true
                });
            }else {
                console.log('error :(')
                res.json({
                    consola: 'Error al analizar el código :(',
                    errores: error
                });
            }
        }
    }

    public generarReporteErrores(req:Request, res:Response) {
        res.json({
            info: ListaErrores
        });
    }

    //Devuelve el código dot obtenido al interpretar el código TypeWise
    public generarArbolAST(req:Request, res:Response) {
        console.log(codigoDot);
        const archivo = '../frontend/graficoAST.txt';

        async function escribir(fileName: string, data: any) {
            await writeFile(fileName, data);
        }

        try {
            escribir(archivo, codigoDot);
        
            exec("dot -Tsvg ../frontend/graficoAST.txt -o ../frontend/graficoAST.svg", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                open("../frontend/graficoAST.svg")
            });
        } catch (error) {
            console.log("Ha ocurrido un error al generar el gráfico del árbol");
        }
        res.json({
            info: codigoDot
        });
    }
}

export const indexController = new IndexCrontroller();