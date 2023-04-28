let contenido = "";

let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers:true,
    matchBrackets: true,
    styleActiveLine: true,
    autoCloseBrackets: true,
    theme:"monokai",
    mode: "text/x-java",
});
editor.setSize("620", "530");

let consola = CodeMirror.fromTextArea(document.getElementById('consola'), {
    lineNumbers:true,
    matchBrackets: true,
    // styleActiveLine: true,
    autoCloseBrackets: true,
    theme:"monokai",
    mode: "text/x-java",
    readOnly:true
});
consola.setSize("620", "530");

const btnNewFile = document.getElementById('new-file');
btnNewFile.addEventListener('click', nuevoArchivo);

function nuevoArchivo() {
    editor.setValue("");
    consola.setValue("");
}

const btnOPenFile = document.getElementById('open-file');
btnOPenFile.addEventListener('click', subirArchivo);

function subirArchivo() {
    let file = document.getElementById('input-file').files[0];
    if (file) {
        let fr  = new FileReader();
        fr.readAsText(file);
        fr.addEventListener('load', () => {
            contenido = fr.result;
            editor.setValue(contenido);
        });
        document.getElementById('input-file').value = "";
    }else {
        alert('Asegurate de subir un archivo');
    }
}

const btnSaveFile = document.getElementById('save-file');
btnSaveFile.addEventListener('click', guardarArchivo);

function guardarArchivo() {
    const archivo = window.URL.createObjectURL(new Blob([editor.getValue()], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = archivo
    link.setAttribute('download', 'archivo.tw')
    // document.body.appendChild(descarga)
    link.click();
}

const btnTablaSimbolos = document.getElementById('tabla-simbolos')
btnTablaSimbolos.addEventListener('click', () => {
    window.open ('../pages/reporte-simbolos.html', "_newtab" ); 
});

const btnReporteErrores = document.getElementById('reporte-errores')
btnReporteErrores.addEventListener('click', () => {
    window.open ('../pages/reporte-errores.html', "_newtab" ); 
});

const btnReporteArbol = document.getElementById('reporte-arbol')
btnReporteArbol.addEventListener('click', () => {
    // window.open ('../pages/reporte-ast.html', "_newtab" );
    async function reporteAST(){

        try {
            //Consulta al backend
            let respuesta = await fetch(`http://localhost:3000/indexRoutes/reporte-ast`);
            let data = await respuesta.json();
            console.log(data.info)
        } catch (error) {
            console.log(error)
        }
    }
    reporteAST();
});

const btnEjecutar = document.getElementById('ejecutar');
btnEjecutar.addEventListener('click', analizarCodigo);

async function analizarCodigo(){

    try {
        let objeto = {
            "code": editor.getValue()
        }
        //Consulta al backend
        let respuesta = await fetch(`http://localhost:3000/indexRoutes/interpretar`, {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                'Content-Type': 'application/json',

            }
            //'Acces-Control-Allow-Origin': '*'
        });
        let data = await respuesta.json();
        consola.setValue(data.consola);
        console.log('AaAAAAAAAAAAAAAA')        
    } catch (error) {
        console.log(error)
        consola.setValue('Error en el servidor');
    }
}