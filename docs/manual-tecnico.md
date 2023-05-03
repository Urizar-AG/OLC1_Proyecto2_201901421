Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Escuela de Ingeniería en Ciencias y Sistemas  
Organización de Lenguajes y Compiladores 1  
Primer Semestre 2023  
  
Angel Miguel García Urizar  
201901421

# MANUAL TÉCNICO - PROYECTO 2

## AMBIENTE DE DESARROLLO
El programa se desarrolló en el sistema operativo Windows 10

* **Lenguaje de Programación**
    * Typescript
    * Javascript

* **Herramientas Utilizadas**
    * Node js v18.15.0
    * Express 4.18.2
    * Jison v0.4.18
    * Codemirror
    * Graphviz versión 6.0.1 para Windows

## ACERCA DEL PROGRAMA  
TypeWise es un programa que es un intérprete para utilizar en el curso de OLC1. La lógica del programa está hecha en node js, con express y typescript. Mientras que el frontend del programa está hecho con javascript, html y css.
El intérprete que ofrece TypeWise es capaz de generar un reporte de errores léxicos y sintácticos encontrados en el código fuente, la tabla de símbolos y la gráfica del árbol AST, este último mediante la herramienta de graphviz.  
TypeWise establece su propia sintaxis para su código fuente, este código puede ser cargado mediante archivos en formato `.tw` o bien en archivos creados desde el frontend.  
TypeWise está diseñado bajo el patrón-interprete y el compilador del programa está construido en `jison`  

## LÓGICA DEL PROGRAMA

<details><summary>API</summary>  
  
La API que utiliza el programa está construida en Express, la API se ejecuta en el puerto `3000` La URL que utiliza el programa es: `http://localhost:3000/indexRoutes`

|Endpoint| Tipo| Descripción |
|:--:|:--:|:--|
|/interpretar|POST|Este endpoint es consumido por el frontend cuando se ejecuta el código del usuario. El código del usuario se recibe en el backend y este es analizado por el parser generado con jison.|  
|/tabla-simbolos|GET|Devuelve un json al frontend, este json contiene un arreglo que almacena los símbolos construidos al analizar el código.|  
|/reporte-errores|GET|Devuelve un json al frontend, este json contiene un arreglo que almacena los errores léxicos y sintácticos encontrados al analizar el código.|
|/reporte-ast|GET|Genera un archivo con código dot que es el árbol AST y lo convierte a imagen `.svg` con la herramienta graphviz.Por último abre la imagen y la muestra en el navegador.|
</details>  
  
<details><summary>Patrón-intérprete</summary>

La lógica del programa está diseñada bajo el patrón-interprete, entonces el programa utiliza dos clases abstractas `Instruction` y `Expression` de estás clases heredan según corresponda el resto de clases utilizadas en el programa.

* La clase `Instruction` se utiliza para acciones o sentencias escritas en el código fuente que no requiere de devolver un valor. Declaración de variables, sentencias cíclicas, asignaciones, etc.  
![clase-instruction](https://drive.google.com/uc?export=view&id=1gu8rSPwBrqccP6962RIFrWL2p41puQOs)  

* La clase `Expression` se utiliza para acciones o sentencias escritas en el código fuente que requieren de devolver un valor. Operaciones aritméticas, llamada a una función, acceso a una variable, etc.
![clase-expression](https://drive.google.com/uc?export=view&id=1nrwVsGBf2g4SZ13-xT-w_xU3vg_AkKpx) 
</details>

<details><summary>Reporte de Errores</summary>

El reporte de errores que el usuario puede visualizar se construye en el frontend y se presenta al usuario en una tabla html. EL frontend utiliza un array que recibe del backend que contiene la información necesaria para construir la tabla. Cada posición del array almacena un objeto de tipo `Error` que contiene la información necesaria para reportar un error.
![clase-errores](https://drive.google.com/uc?export=view&id=1rIeKiThkyMG30yIFuqv1qtw7hTsWbSlf) 
</details>

<details><summary>Tabla de Símbolos</summary>

La tabla de símbolos que el usuario puede visualizar se construye en el frontend y se presenta al usuario en una tabla html. El frontend utiliza un array que recibe del backend que contine la información necesaria para construir la tabla. Cada posición del array almacena un objeto de tipo `TSymbol` que contiene la información necesaria para formar la tabla de símbolos.
![clase-tsymbolos](https://drive.google.com/uc?export=view&id=1u-q0jrAV-ykamHvsrFm3ziDe6WD9Hzkp) 
</details>

<details><summary>Árbol AST</summary>

EL reporte gráfico del árbol AST se construye en el backend, la información para construir el árbol se almacena en un array que luego al recorrerlo con ayuda de una función se escribe el código dot para después ser convertido a imagen en formato `.svg` Cuando el usuario pide ver el el árbol, el backend se encarga de generar la imagen para después abrirla en el navegador del usuario.   
La información para construir el árbol se ejecuta con ayuda de un archivo jison que contiene la gramática que utiliza el programa pero a diferencia de esta, las producciones de la gramática del árbol construyen un nodo donde se guarda la información acerca de esa producción.   Como el compilador es ascendente entonces se construye desde las hojas hacia la raíz, entonces al recorrer el array el gráfico queda armado de raíz a hojas obteniendo así la representación gráfica del árbol.
![clase-node](https://drive.google.com/uc?export=view&id=1xpQU02OZAkR4zRYvq3WSnifBvIh_HZth) 
</details>

## ARCHIVO DE ENTRADA

El usuario tiene la opción de cargar archivos `.tw` que contienen código soportado por TypeWise, al abrir un archivo este se muestra en el área de edición en el la vista del usuario. El usuario cuenta con la opción de guardar un archivo, entonces cuando elige está opción se captura el código del editor y se escribe un archivo que se descarga por medio del navegador.  
Cuando se ejecuta el código escrito por el usuario este se muestra en el área de consola de la vista del usuario, si existen errores léxico o sintácticos en el código estos también se muestran en la consola del programa.

```java  
void metodo1(){
    //llamada del metodo
    figura1(10);
}
void figura1(int n) {
        String cadenaFigura = "";
        double i; 
        i=-3*n/2;
        //iniciando dibujo
        while(i<=n){
            cadenaFigura = "";
            double j; 
            j=-3*n/2;
            while(j<=3*n){
                double absolutoi;
                absolutoi = i;
                double absolutoj;
                absolutoj = j;
                if(i < 0)
                {
                    absolutoi = i * -1;
                }
                if(j < 0)
                {
                    absolutoj = j * -1;
                }
                if((absolutoi + absolutoj < n)
                        || ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
                        || ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
                    cadenaFigura = cadenaFigura + "* ";
                }
                else
                {
                    cadenaFigura = cadenaFigura + ". ";
                }
                j=j+1;
            }
            print(cadenaFigura);
            i=i+1;
        }
        print("Si la figura es un corazón, te aseguro que tendrás un 100 :3");
    }
main metodo1();
```

## Gramática
Gramática utilizada: [Ver Gramática](gramatica.md)