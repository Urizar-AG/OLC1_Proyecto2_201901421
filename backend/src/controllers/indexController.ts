import { Request, Response } from "express";

class IndexCrontroller {

    //Método de prueba
    public test(req: Request, res: Response) {
        res.send('Hello World');
    }

    public interpretar(req: Request, res: Response) {
        try {
            let parser = require("./interpreter/grammar/grammar");
            let code = req.body.code;
            const ast = parser.parse(code);
            for(const inst of ast) {
                inst.execute();
            }
            res.json({
                consola: 'Ejecutado con éxito',
                errores: null
            });
        } catch (error) {
            console.log('Something goes wrong, try again');
            console.log(error);
            res.json({
                consola: error,
                errores: error
            });
        }
    }
}

export const indexController = new IndexCrontroller();