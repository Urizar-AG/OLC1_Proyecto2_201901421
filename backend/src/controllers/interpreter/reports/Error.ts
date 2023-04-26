export class Error {
    public errorType:string;
    public description: string;
    public linea:number;
    public colum:number;
    constructor(errorType:string, description: string, linea:number, colum:number) {
        this.errorType = errorType;
        this.description = description;
        this.linea = linea;
        this.colum = colum;
    }
}

export let ListaErrores: Array<Error> = [];