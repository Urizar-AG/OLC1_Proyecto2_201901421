let body = document.querySelector('body');
body.onload = reporteErrores();

async function reporteErrores(){

    try {
        //Consulta al backend
        let respuesta = await fetch(`http://localhost:3000/indexRoutes/reporte-errores`);
        let data = await respuesta.json();
        let ttbody = document.getElementById('table-tbody');
        
        let arreglo = data.info;
        let aux = "";
        for (let i = 0; i < arreglo.length; i++) {
            aux = aux + 
            `<tr>
                <td>${i+1}</td>
                <td>${arreglo[i].errorType}</td>
                <td>${arreglo[i].description}</td>
                <td>${arreglo[i].linea}</td>
                <td>${arreglo[i].colum}</td>
             </tr>
            `
        }
        ttbody.innerHTML += aux;
    } catch (error) {
        console.log(error)
    }
}