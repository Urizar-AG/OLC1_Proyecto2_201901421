let body = document.querySelector('body');
body.onload = reporteErrores();

async function reporteErrores(){

    try {
        //Consulta al backend
        let respuesta = await fetch(`http://localhost:3000/indexRoutes/tabla-simbolos`);
        let data = await respuesta.json();
        let ttbody = document.getElementById('table-tbody');
        
        let arreglo = data.info;
        let aux = "";
        for (let i = 0; i < arreglo.length; i++) {
            aux = aux + 
            `<tr>
                <td>${i+1}</td>
                <td>${arreglo[i].id}</td>
                <td>${arreglo[i].type1}</td>
                <td>${arreglo[i].type2}</td>
                <td>${arreglo[i].entorno}</td>
                <td>${arreglo[i].line}</td>
                <td>${arreglo[i].column}</td>
             </tr>
            `
        }
        ttbody.innerHTML += aux;
    } catch (error) {
        console.log(error)
    }
}