Universidad de San Carlos de Guatemala  
Facultad de Ingeniería  
Escuela de Ingeniería en Ciencias y Sistemas  
Organización de Lenguajes y Compiladores 1  
Primer Semestre 2023  
  
Angel Miguel García Urizar  
201901421

# MANUAL DE USUARIO - PROYECTO 2

## REQUISITOS PARA UTILIZAR EL PROGRAMA
* Node js v18.15.0
* Tener un navegador de internet
* Graphiz

> [Click aquí para descargar Node js desde su página oficial](https://nodejs.org/en)  
  
## ACERCA DEL PROGRAMA
TypeWise es un programa diseñado para ser una herramienta para el estudiante del curso de Organización de Lenguajes y Compiladors 1. El programa ofrece un intérprete que se encarga de realizar el análisis léxico y sintáctico y ejecutar todas las sentencias del código fuente.  
TypeWise define un lenguaje propio para ser utilizado dentro del programa, el código fuente se maneja mediante archivos en formato `.tw`  
  
Adicionalmente el programa ofrece una serie de reportes con el fin de dar mejor información del resultado de analizar el código fuente.  
  
## FUNCIONAMIENTO DEL PROGRAMA  
<details><summary></summary>  

Para iniciar a usar el programa debemos abrir la consola de nuestra pc y ubicarnos en la carpeta `backend` que está dentro de la carpeta del programa. Aquí escribimos el siguiente comando `npm run dev` para iniciar con la ejecución de nuestro programa.   
Luego en la carpeta de nuestro programa frontend debemos ir a la carpeta `pages` y abrir el archivo llamado `index.html` Este archivo se abrirá en nuestro navegador y veremos una página como la siguiente:  
![inicio](https://drive.google.com/uc?export=view&id=13Fdhd3VsYkc_AktX8o4hJ-sFRFbsb4S5)  

</details>  
  
### DESCRIPCIÓN INTERFAZ GRAFICA  
<details><summary></summary>  

1. Archivo: Este menú cuenta con las siguientes opciones:  
    * **Crear:** Permite crear un archivo `.tw` desde cero.
    * **Abrir:** Permite abrir un archivo `.tw` con código fuente que tengamos en nuestra PC.
    * **Guardar:** Descarga un archivo `.tw` que contendrá el código fuente que se encuentre en el editor al momento de hacer click en el botón de guardar.  

2. Reportes: Este menú cuenta con las siguientes opciones:
    * **Reporte Errores:** Genera una tabla html con los errores léxicos y sintácticos encontrados al momento de analizar el código fuente.
    * **Árbol AST:** Genera un reporte mediante graphviz del árbol de análisis sintáctico y lo muestra en el navegador.
    * **Tabla de Símbolos:** Genera una tabla html con los símbolos encontrados en el código fuente. 
</details>  

### DESCRIPCIÓN DEL LENGUAJE  
TypeWise utiliza su propio lenguaje para el uso del programa. El lenguaje TypeWise es case insensitive esto quiere decir que no distinguirá entre mayúsculas o minúsculas, entonces para TypeWise `x` es lo mismo `X`, `int` es lo mismo que `INT` o `Int`  
  
#### 
<details>
<summary>COMENTARIOS</summary>
Los comentarios sirven para dejar mensajes en nuestro código, estes mensajes sirven solo como ayuda para nosotros, ya que las secciones marcadas como comentarios serán ignoradas por el intérprete  

```java  

//Este es un comentario de una línea  
/*
    Este es un comentario
    multilínea 
    esta es la línea 3  
    acepta cualquier carácter 
    por ejemplo ! , $ , ^
*/ 
```
</details>  
  
#### 
<details>
<summary>TIPOS DE DATOS</summary>
Los tipos de datos soportados por el lenguaje son:  

![tipo-dato](https://drive.google.com/uc?export=view&id=1w4zIa-CK8xOrql4ARsPA7E5eNtS5QleR)    
</details>  

#### 
<details>
<summary>SECUENCIAS DE ESCAPE</summary>
Dentro de las cadenas de texto se pueden definir ciertos lenguajes especiales:  

![secuencia-escape](https://drive.google.com/uc?export=view&id=1ER9deFZ6o-73L30R2swORrRbI4ir1Qgv)    
</details>  

#### 
<details>
<summary>SUMA</summary>

La suma forma parte de las operaciones aritméticas que puede realizar TypeWise, para la suma se utliza el símbolo `+`  

![suma](https://drive.google.com/uc?export=view&id=19lTgxdUR_drzCvJ5NT2p5o-QcxVes5H1)    
</details>

#### 
<details>
<summary>RESTA</summary>

La resta forma parte de las operaciones aritméticas que puede realizar TypeWise, para la resta se utliza el símbolo `-`  

![resta](https://drive.google.com/uc?export=view&id=1xbU3Sktxg1xLj1a2_02Ojnp1nD_8-Shf)    
</details>

#### 
<details>
<summary>MULTIPLICACIÓN</summary>

La multiplicación forma parte de las operaciones aritméticas que puede realizar TypeWise, para la multiplicación se utliza el símbolo `*`  

![multiplicacion](https://drive.google.com/uc?export=view&id=14q3u-KgLoCPbEqLKq3Rd-0CT54sImzXu)    
</details>

#### 
<details>
<summary>DIVISIÓN</summary>

La división forma parte de las operaciones aritméticas que puede realizar TypeWise, para la división se utliza el símbolo `/`  

![division](https://drive.google.com/uc?export=view&id=11O7_7p4-b6sZP7a-4S2t-TigvqIymqdE)    
</details>  

#### 
<details>
<summary>Potencia</summary>

La potencia forma parte de las operaciones aritméticas que puede realizar TypeWise, para la potencia se utliza el símbolo `^`  

![potencia](https://drive.google.com/uc?export=view&id=1a1iKFjg8Z3gL93Kjx9OS16vmyNs1DuSg)    
</details>

#### 
<details>
<summary>Módulo</summary>

El módulo forma parte de las operaciones aritméticas que puede realizar TypeWise, para el módulo se utliza el símbolo `%`  

![modulo](https://drive.google.com/uc?export=view&id=1vd1o5qxhNvvR6VdgBVgoByHcddwSUKh6)    
</details>

#### 
<details>
<summary>NEGACIÓN UNARIA</summary>

La negación unaria forma parte de las operaciones aritméticas que puede realizar TypeWise, la negación unario consiste en negar el valor de un número, para la negación unaria se utliza el símbolo `-`  

![negacion-unaria](https://drive.google.com/uc?export=view&id=1so-esqB_5Nf8_km_Xnl9DUEXrde1UUGA)    
</details>

#### 
<details>
<summary>OPERADORES RELACIONALES</summary>
Se utilizan para comparar expresiones, dando como resultado un tipo de dato boolean. Las comparaciones se pueden hacer entre cualquier combinacion resultante de los tipos de dato entero, doble y caracter, también es posible realizar la comparación entre tipos de datos boolean.

![operadores-relacionales](https://drive.google.com/uc?export=view&id=1hWkt8VVqhSeGH1y0orUrPuyOMCowUxF9)    
</details>

#### 
<details>
<summary>OPERADORES LÓGICOS</summary>
Se utilizan para comparar expresiones a nivel lógico.

![operadores-logicos](https://drive.google.com/uc?export=view&id=1lr1KfTMfgz9zehEUDmtB4tzVXsp9GaFd)    
</details>

#### 
<details>
<summary>OPERADOR TERNARIO</summary>

Se considera una instrucción `if` resumida, la forma de utilizar el operador ternario consiste en una condición seguida de `?` , luego se coloca el valor a retornar si la condición se cumple, después se coloca `:` seguida del valor a retornar si la condicióne es falsa.  

```java  

int edad = 18;
boolean bandera = false;
bandera = edad > 17 ? true: false; // Retorna true 
```
</details>  

#### 
<details>
<summary>DECLARACIÓN Y ASIGNACIÓN DE VARIABLES</summary>

Para declarar una variable primero se debe indicar el tipo de dato seguido de un nombre para la variable, luego el símbolo `=` seguido del valor a asignar a la variable, para terminar la declaración agregando un `;` 

```java  

int edad = 18;
String cadena = "Hola Mundo";
// Esta es otra forma de declarar una variable, por defecto toma el valor default según corresponda al tipo de dato
boolean bandera; 
```
</details>

#### 
<details>
<summary>CASTEOS</summary>

Como las variables no pueden cambiar de tipo, es decir que una variable declarada de tipo int solo podrá almacenar enteros y no otro valor que corresponda a otro tipo de dato. Es por ello que el programa permite hacer casteos, que es convertir un valor de un tipo a otro valor de otro tipo. Para realizar el casteo se hace de la siguiente forma, `(Tipo de dato al que se quiere convertir)valor a convertir`

```java  
int edad = (int) 18.8; //a edad se le asigna el valor de 18
char letra = (char)97; // a letra se le asigna la letra 'a'
double numero = (double)16; // a numero se le asigna el valor de 16.0
/*
    Los casteos aceptados son los siguientes:
    - int a dobule
    - double a int
    - int a string
    - int a char
    - double a string
    - char a int
    - char a double
*/ 
```
</details>

#### 
<details>
<summary>INCREMENTO Y DECREMENTO</summary>

Es una forma de sumar o restar una unidad al valor que almacena una variable.

```java  
int edad = (int) 18.8; //a edad se le asigna el valor de 18
edad++; // ahora tiene el valor de 19
edad--; // ahora tiene el valor de 18
```
</details>

#### 
<details>
<summary>VECTORES</summary>

Un vecto es una estructura de datos de tamaño fijo, que se utiliza para almacenar valores de un mismo tipo, estos valores deben ser del mismo tipo que el tipo indicado para el vector.

La declaración de vectores se realiza de dos formas:
1. La primera forma, se indica el tipo del vector, luego `[]` seguido del nombre del vector, después se escribe `=` seguido de la palabra `new` y se indica de nuevo el tipo del vector, esto seguido de `[tamaño del vector (debe ser un valor entero)]` y finaliza con `;`.
2. La segunda forma, se indica el tipo del vector, luego `[]` seguido del nombre del vector, después se escribe `=` seguido de `{lista de valores}` y finaliza con punto y coma. Esta lista de valores debe ser del mismo tipo que el tipo del vector y los valores deben estar separados por coma.

```java  
int [] forma1 = new int[4]; // vector de tamaño fijo 4
String [] forma2 = {"Hola", "OLC1"}; //vector de tamaño fijo 2
```

Para acceder o obtener el valor de una posición de un vector se indica el nombre del vector seguido de `[indice]` indice debe ser de tipo númerico y puede ser desde 0 hasta el tamaño del vector menos uno. Entonces un vecto de tamaño 8 los indices para acceder a sus posiciones van desde 0 a 7

```java  
String [] forma2 = {"Hola", "OLC1"}; // vector de tamaño fijo 2
String valor_posicion0 = forma2[0]; // valor_posicion0 = "Hola"
String valor_posicion1 = forma2[1]; // valor_posicion1 = "OLC1"
```

Los valores almacenados en las posiciones del vector pueden ser modificados, esto se hace de la siguiente manera, nombre del vector `[indice]`, luego se escribe `=` seguido del valor a agregar y finaliza con punto y coma.
```java  
String [] miVector = {"Hola", "OLC1"}; 
miVector[0] = "hello"; 
miVector[0] = "world";
// String [] mi vector = { "hello", "world" };
```
</details>

#### 
<details>
<summary>VECTORES</summary>

Un vector es una estructura de datos de tamaño fijo, que se utiliza para almacenar valores de un mismo tipo, estos valores deben ser del mismo tipo que el tipo indicado para el vector.

La declaración de vectores se realiza de dos formas:
1. La primera forma, se indica el tipo del vector, luego `[]` seguido del nombre del vector, después se escribe `=` seguido de la palabra `new` y se indica de nuevo el tipo del vector, esto seguido de `[tamaño del vector (debe ser un valor entero)]` y finaliza con `;`.
2. La segunda forma, se indica el tipo del vector, luego `[]` seguido del nombre del vector, después se escribe `=` seguido de `{lista de valores}` y finaliza con punto y coma. Esta lista de valores debe ser del mismo tipo que el tipo del vector y los valores deben estar separados por coma.
```java  
int [] forma1 = new int[4]; // vector de tamaño fijo 4
String [] forma2 = {"Hola", "OLC1"}; //vector de tamaño fijo 2
```

Para acceder o obtener el valor de una posición de un vector se indica el nombre del vector seguido de `[indice]` indice debe ser de tipo númerico y puede ser desde 0 hasta el tamaño del vector menos uno. Entonces un vecto de tamaño 8 los indices para acceder a sus posiciones van desde 0 a 7
```java  
String [] forma2 = {"Hola", "OLC1"}; // vector de tamaño fijo 2
String valor_posicion0 = forma2[0]; // valor_posicion0 = "Hola"
String valor_posicion1 = forma2[1]; // valor_posicion1 = "OLC1"
```

Los valores almacenados en las posiciones del vector pueden ser modificados, esto se hace de la siguiente manera, nombre del vector `[indice]`, luego se escribe `=` seguido del valor a agregar y finaliza con punto y coma.
```java  
String [] miVector = {"Hola", "OLC1"}; 
miVector[0] = "hello"; 
miVector[0] = "world";
// String [] mi vector = { "hello", "world" };
```
</details>

#### 
<details>
<summary>LISTAS</summary>

Una lista es una estructura similar al vector, con la diferencia que estas no tinenen un tamaño fijo sino que puede almacenar hasta N elementos.

Para declarar una lista debemos escribir la palabra `list` seguida de `<tipo de dato>`, luego debemos indicar el nombre de la lista seguido del `=`, después debemos escribir la palabra `new` seguida de la palabra `list` y por último `<tipo de dato>` finalizando con un `;`
```java  
list<double> lista1 = new list<double>;
list<boolean> lista2 = new list<boolean>;
```

Para agregar valores a las listas debemos indicar el nombre de la lista seguido de `.add`, luego dentro de parentesis indicamos el valor a agregar y finalizando la sentencia con `;`
```java  
list<double> lista1 = new list<double>;
lista1.add(5.5);
lista1.add(0.1);
```

Para acceder al valor de una posición de una lista, debemos indicar el nombre de la lista seguido de `[[indice]]` indice debe ser de tipo numérico y puece ser desde 0 hasta el tamaño de lista menos uno.
```java  
list<double> lista1 = new list<double>;
lista1.add(5.5);
lista1.add(0.1);
lista1.add(25.32);

int valor = lista1[[2]]; //valor = 25.32
```

Los valores almacenados en las posiciones de la lista pueden ser modificados, esto se hace indicando el nombre de la lista `[[indice]]`, luego se escribe `=` seguido del valor a agregar y finaliza con `;`
```java  
list<double> lista1 = new list<double>;
lista1.add(5.5);
lista1.add(0.1);
lista1.add(25.32);

lista1[[1]] = 8.5
int valor = lista1[[1]]; //valor = 8.5
```
</details>

####
<details>
<summary>IF</summary>

La sentencia if evalua una condición se esta se cumple las sentencias que esten dentro de ella se ejecutan, caso contrario se omiten.
Cuando se utiliza la sentencia if, también puede utilizarse la palabra `else` para definir sentencias a ejecutar en caso de la condición del if no se cumpla. Luego de la palabra else puede utilizarse un if en caso se quiera evaluar otra condición.

```java  
int edad = 18;
if(edad == 18) {
    print("18 años");
}else if (edad > 18) {
    print("Mayor de 18");
}else {
    print("Menor de 18");
}
```

</details>

####
<details>
<summary>SWITCH</summary>

El switch case es una estructura para la toma de decisiones múltiples. En el switch se indica la condición a evaluar y dentro de esta instruccion se indica las opciones que queremos evaluar para esa condición. También es posible establecer una opción default en caso ningua de las que definamos se cumpla.

```java  
int edad = 18;
switch(edad) {
    case 10: 
        print("Tengo 10 años");
        break; // Indica el final del caso
    case 18:
        print("Tengo 18 años");
        break;
    case 25:
        print("Tengo 25 años");
        break;
    default:
        print("NO se que edad tengo");
        break;
}
```
</details>

####
<details>
<summary>WHILE</summary>

Es un ciclo que ejecuta un conjunto de instrucciones mientras la condición evaluada sea valida.
```java  
int numero = 0;
while(x < 100) { //Imprime los numeros desde 0 a 99
    print(x);
    x++;
}
```
</details>

####
<details>
<summary>FOR</summary>

Es un ciclo que permite ejecutar un conjunto de instrucciones N cantidad de veces
```java  
for(int i = 0; i < 100; i++) { //Imprime los numeros de 0 a 99
    print(i);
}

int contador = 99;
for(i = contador; i > 0; i = i - 1) { //Imprime los numeros de 99 a 1
    print(i);
}
```
</details>

####
<details>
<summary>DO WHILE</summary>

Es un ciclo que ejecuta al menos una vez un conjunto de instrucciones, luego evalua la condición, si la condición se cumple vuelve a ejecutarse caso contrario avanza a la siguiente sentencia.
```java  
boolean a = false;
do {
    print("Hola");
}while(a);//"Hola" solo se imprime una vez porque al evaluar la condición está resulta falsa.
```
</details>

####
<details>
<summary>BREAK</summary>

Esta sentencia detiene un ciclo inmediatamente, entones el código que se encuentre después del break no se ejecutara.
```java  
for(int i = 0; i < 100; i++) { 
    print(i);
    if(i == 50){
        break; //Detiene el ciclo for, por lo que solo imprime de 0 a 50
    }
}
```
</details>

####
<details>
<summary>CONTINUE</summary>

Esta sentencia detiene la ejecución de una iteración en un ciclo y salta a la siguiente iteración.
```java  
for(int i = 0; i < 100; i++) { 
    if(i == 50){
        continue; //Imprime de 0 a 99 exceptuando el 50
    }
    print(i);
}
```
</details>

####
<details>
<summary>RETURN</summary>

Finaliza la ejecución de un método o función y de ser necesario, devuelve un valor a quien llama la función.
```java  
for(int i = 0; i < 100; i++) { 
    if(i == 50){
        return i; //De vuelve el valor 50
    }
    print(i);
}
```
</details>

####
<details>
<summary>FUNCIONES</summary>

Una función es una subrutina de código que se declara indicando un tipo de dato un nombre `(parametros o no)`, si se indicando parámetros estos debe estar compuestos por un tipo de dato y un nombre para el parámetro, luego `{serie de instrucciones}`. Las funciones deben devolver un valor del tipo indicado al momento de su declaración.
```java  
int sumar(){
    int x = 1;
    int y = 29;
    int z = x + y;
    return(z);
}

String concatenar(string c1, char c2){
    return c1 + c2;
}
```
</details>

####
<details>
<summary>MÉTODOS</summary>

Los métodos funcionan de manera similar a las funciones con la excepción que estos no devuelven un valor. Y el tipo de dato a indicar al momento de la declaración de los métodos solo puede ser `void`
```java  
void sumar(){
    int x = 1;
    int y = 29;
    int z = x + y;
    print("El resultado de la suma es: " + z);
}

Void Concatenar(string c1, char c2){
    print(c1 + c2);
}
```
</details>

<details>
<summary>LLAMADAS A MÉTODOS Y FUNCIONES</summary>

Las llamadas a métodos y funciones se realiza de la misma manera, se indica el nombre del método o función luego `(parametros si los hay)`.
```java  
int sumar(){
    int x = 1;
    int y = 29;
    int z = x + y;
    return(z);
}

Voi Concatenar(string c1, char c2){
    print(c1 + c2);
}

int x = sumar(); // x = 30
concatenar("OLC" + '1'); //imprime "OLC1"
```
</details>

####
<details>
<summary>PRINT</summary>

Permite imprimir en el área de consola expresiones con valores de tipo int, double, boolean, string o char.
```java  
print("Hola Mundo");
    print("Sale " + sumar(1 + 0));
print(true);
```
</details>

####
<details>
<summary>LENGTH</summary>

Esta función recibe como parámetro una cadena, un vector o una lista y devuelve el tamaño de este como tipo de dato entero.
```java  
string cadena = "hola";
int tamanio = length(cadena); //tamanio = 4
int vector = { 1, 4, 10, 6, 8, 3 };
int tam_vector = length(6); //tam_vector = 6
```
</details>

####
<details>
<summary>TRUNCATE</summary>

Esta función recibe como parámetro un valor numérico y elimina la parte decimal de este, retornando un entero.
```java  
double valor = 3.53124797912;
int nuevoValor = truncate(valor); //nuevoValor = 3
```
</details>

####
<details>
<summary>ROUND</summary>

Esta función recibe como parámetro un valor numérico y redondea este valor según las siguientes reglas:
* Si el decimal es mayor o igual que 0.5, se aproxima al número superior.
* Si el decimal es menor que 0.5, se aproxima al número inferior.
```java  
double valor1 = 3.53124797912;
int nuevoValor = round(valor1); //nuevoValor = 4
double valor2 = 1.4;
int nuevo_valor = round(valor2); //nuevo_valor = 1
```
</details>


####
<details>
<summary>TYPEOF</summary>

Esta función retorna una tipo de dato string con el nombre del tipo de dato evaluado.
```java  
int x = 1;
double y = 5.124;
boolean z = false;
string tipo = typeof(x); //tipo = "int"
string tipo2 = typeof(y); //tipo2 = "double"
string tipo3 = typeof(z); //tipo3 = "boolean"
```
</details>

####
<details>
<summary>TO STRING</summary>

Convierte un tipo de dato numérico o de tipo boolean a texto.
```java  
string valor = toString(14); // valor = "14"
string valor2 = toString(true); // valor = "true"
```
</details>

####
<details>
<summary>MAIN</summary>

Para poder ejecutar todo el código fuente es necesaria que haya una llamada a un método o a una función donde se anteponga palabra `main` con está palabra indicamos que la ejecución debe iniciar ahí. Si no se encuentra esta palabra en el código fuente el código no se ejecuta.
```java  
void funcion1 () {
    print("Inicio");
    funcion2(3);
}

int funcion2(int x) {
    return x + 1;
}

main function1();
```
</details>

### REPORTE DE ERRORES 
<details>
<summary></summary>
Si al analizar nuestro código fuente se encuentra errores, podemos ver el reporte de errores

![reporte-errores](https://drive.google.com/uc?export=view&id=1I_8Pzh7f1-S9xHTHt6pGKCl42QoSXp20)   
</details>

### TABLA DE SÍMBOLOS
<details>
<summary></summary>
Ejemplo de una tabla de símbolos

![reporte-simbolos](https://drive.google.com/uc?export=view&id=1Zh8JCrfcuB9QIYG7Qa-gYlhi5AwhvLEM)   
</details>

### ÁRBOL AST
<details>
<summary></summary>
Ejemplo de un árbol AST

![reporte-ast](https://drive.google.com/uc?export=view&id=14RgqPSxTkBRlM7U35yWfDWN9B_RZ7wMv)   
</details>

### EJEMPLO DE EJECUCIÓN
<details>
<summary></summary>

Ejemplo de ejecución de código y salida en consola.
![reporte-ejecucion](https://drive.google.com/uc?export=view&id=18JPNTEHtMICBJuFE-zKAVJnc7fHU2h3h)   
</details>
