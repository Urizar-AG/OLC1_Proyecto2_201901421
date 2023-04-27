
//Clase para manejar los nodos del árbol AST
export class Node {

    public name:string; //Nombre del nodo
    public value:string; //Valor del nodo, este valor se muestra en el graphviz
    public hijos:Node[]; //Listado de hijos del nodo

    constructor(name:string, value:string) {
        this.name = name;
        this.value = value;
        this.hijos = [];
    }

    add() {
        for (let i = 0; i < arguments.length; i++) {
            this.hijos.push(arguments[i]);
        }
    }

}