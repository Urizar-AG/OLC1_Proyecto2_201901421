//Recorre el array con la info del árbol y genera el código dot
export function Graficador(raiz:any){
    let cnt = 1; //Variable auxiliar para agregar id a los nodos

    let dot = "digraph G{\n";
    dot += "N0[label=\"" + raiz.value + "\"];\n";
    conectarNodos("N0", raiz)
    dot += "}";
    
    return dot;

    //Función recursiva que conecta los nodos
    function conectarNodos(nombreNodo: any, nodo: any) {
        if (nodo === undefined || nodo === null || nodo.hijos.length === 0) {
            return
        } else {
            //Recorre el nodo padre y agrega sus nodos hijos
            for (let i = 0; i < nodo.hijos.length; i++) {
                if (!(nodo.hijos[i] == undefined)) {
                    let hijo = "N" + cnt;
                    dot = dot + hijo + "[label=\"" + nodo.hijos[i].value + "\"];\n";
                    dot = dot + nombreNodo + "->" + hijo + ";\n";
                    cnt++;
                    conectarNodos(hijo, nodo.hijos[i]);
                }
            }
        }
    }
}
