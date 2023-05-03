### TOKENS

|Token|Patrón|
|:--:|:--:|  
|Espacios|`\s+`|  
|Comentario de una línea|`(\/\/.*[^\n])`|  
|Comentario multilínea|`[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]`| 
|Id|`[a-zA-Z_]+[a-zA-Z0-9_]*`|  
|Decimal|`[0-9]+("."[0-9]+)\b`|  
|Entero|`[0-9]+\b`|  
|Caracter|`[\']([^\t\'\"\n]\|(\\\")\|(\\n)\|(\\\')\|(\\t)\|(\\\\))?[\']`|  
|Cadena|`["]([^"\\]+\|[\\\"]\|[\\n]\|[\\t]\|[\\\\]\|[\\\'])["`|  
|Incremento|`++`|  
|Decremento|`--`|  
|Suma|`+`|  
|Resta|`-`|  
|Multiplicacion|`*`|  
|Division|`/`|  
|Potencia|`^`|  
|Modulo|`%`|  
|Igual|`==`|  
|NoIgual|`!=`|  
|MenorIgual|`<=`|  
|MayorIgual|`>=`|  
|Menor|`<`|  
|Mayor|`>`|  
|Or|`\|\|`|  
|And|`&&`|  
|Not|`!`|  
|Ternario|`?`|  
|Asignacion|`=`|  
|ParentesisApertura|`(`|  
|ParentesisCierre|`)`|  
|PuntoComa|`;`|  
|LlaveApertura|`{`|  
|LlaveCierre|`}`|  
|CorcheteApertura|`[`|  
|CorcheteCierre|`]`|  
|Coma|`,`|  
|DosPuntos|`:`|  
|Punto|`.`|  
|Int|`int`|  
|Double|`double`|  
|String|`string`|  
|Char|`char`|  
|Boolean|`boolean`|  
|Void|`void`|  
|True|`true`|  
|False|`false`|  
|If|`if`|  
|Else|`else`|  
|Switch|`switch`|  
|Case|`case`|  
|Default|`default`|  
|While|`while`|  
|For|`for`|  
|Do|`do`|  
|Break|`break`|  
|Continue|`continue`|  
|Return|`return`|  
|Print|`print`|  
|ToString|`toString`|  
|ToLower|`toLower`|  
|ToUpper|`toUpper`|  
|Length|`length`|  
|Truncate|`truncate`|  
|Round|`round`|  
|Typeof|`typeof`|  
|New|`new`|  
|List|`list`|  
|Add|`add`|  
|Main|`main`|  

---  
  
### GRAMÁTICA  

<pre><code>
Terminales = { Id, Decimal, Entero, Caracter, Cadena, Incremento, Decremento, Suma, Resta, Multiplicacion, Divison, Potencia, 
Modulo, Igual, NoIgual, MenorIgual, MayourIgual, Menor, Mayor, Or, And, Not, Ternario, Asignacion, ParentesisApertura, 
ParentesisCierre, PuntoComa, LLaveApertura, LlaveCierre, CorcheteApertura, CorcheteCierre, Coma, DosPuntos, Punto, Int, 
Double, String, Char, Boolean, Void, True, False, If, Else, Switch, Case, Default, While, For, Do, Break, Continue, Return, 
Print, ToString, ToLower, ToUpper, Lenght, Truncate, Round, Typeof, New, List, Add, Main
}
 
No Terminales = { INICIO, INSTRUCCIONES, EOF, INSTRUCCION , DECLARACIONVARIABLE, ASIGNACIONVARIABLE, INCREMENTARVARIABLE, 
DECREMENTARVARIABLE, DECLARACIONVECTOR, ASIGNACIONVECTOR, DECLARACIONLISTA, AGREGARLISTA, ASIGANCIONLISTA, DECLARACIONFUNCION, 
LLAMADAFUNCION, IF, SWITCH, WHILE, FOR, DOWHILE, BREAK, CONTINUE, RETURN, PRINT, MAIN, TIPO, EXPRESION, LISTAVALORES, 
ASIGNACIONVECTOR, ACCESOVECTOR, ACCESOLISTA, SENTENCIAS, PARAMETROS, PARAMETRO, ARGUMENTOS, LISTACASE, DEFAULTCASE, CASE, 
INDICEFOR, ACTUALIZACIONFOR, CASTEO, TOLOWERUPPER, LENGTH, TRUNCATE, ROUND, TYPEOF, TOSTRING, TERNARIO
}  

Inicio = INICIO  
</code></pre>  

  
<pre><code>
INICIO ::= INSTRUCCIONES  
  
INSTRUCCIONES ::= INSTRUCCIONES INSTRUCCION    
    | INSTRUCCION  
      
INSTRUCCION ::= DECLARACIONVARIABLE  
    | ASIGNACIONVARIABLE  
    | INCREMENTARVARIABLE
    | DECREMENTARVARIABLE
    | DECLARACIONVECTOR
    | ASIGNACIONVECTOR
    | DECLARACIONLISTA
    | AGREGARLISTA
    | ASIGNACIONLISTA
    | DECLARACIONFUNCION
    | LLAMADAFUNCION
    | IF
    | SWITCH
    | WHILE
    | FOR 
    | DOWHILE
    | BREAK
    | CONTINUE
    | RETURN
    | PRINT
    | MAIN

DECLARACIONVARIABLE ::= TIPO Id Asignacion EXPRESION PuntoComa
    | TIPO Id PuntoComa  
      
ASIGNACIONVARIABLE ::= Id Asignacion EXPRESION PuntoComa  
  
INCREMENTARVARIABLE ::= Id Incremento PuntoComa

DECREMENTARVARIABLE ::= Id Decremento PuntoComa

DECLARACIONVECTOR ::= TIPO CorcheteApertura CorcheteCierre Id Asignacion LlaveApertura LISTAVALORES LlaveCierre PuntoComa
    | TIPO CorcheteApertura CorcheteCierre Id Asignacion New TIPO CorcheteApertura EXPRESION CorcheteCierre PuntoComa

LISTAVALORES ::= LISTAVALORES Coma EXPRESION
    | EXPRESION

ASIGNACIONVECTOR ::= Id CorcheteApertura EXPRESION CorcheteCierre Asignacion EXPRESION PuntoComa

ACCESOVECTOR ::= Id CorcheteApertura EXPRESION CorcheteCierre

DECLARACIONLISTA ::= List Menor TIPO Mayor Id Asignacion New List Menor TIPO Mayor PuntoComa

AGREGARLISTA ::= Id Punto Add ParentesisApertura EXPRESION ParentesisCierre PuntoComa

ASIGNACIONLISTA ::= Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre Asignacion EXPRESION PuntoComa

ACCESOLISTA ::= Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre 

DECLARACIONFUNCION ::= TIPO Id ParentesisApertura ParentesisCierre SENTENCIAS
    | TIPO Id ParentesisApertura PARAMETROS ParentesisCierre SENTENCIAS

SENTENCIAS ::= LlaveApertura INSTRUCCIONES LlaveCierre

PARAMETROS ::= PARAMETROS Coma PARAMETRO
    | PARAMETRO

PARAMETRO ::= TIPO Id

LLAMADAFUNCION ::= Id ParentesisApertura ParentesisCierre PuntoComa
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre PuntoComa

ARGUMENTOS ::= ARGUMENTOS Coma EXPRESION
    | EXPRESION 

IF ::= If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else LlaveApertura INSTRUCCIONES LlaveCierre
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else IF
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre

SWITCH ::= Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE DEFAULTCASE LlaveCierre
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE LlaveCierre
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura DEFAULTCASE LlaveCierre

LISTACASE ::= LISTACASE CASE
    | CASE

CASE ::= Case EXPRESION DosPuntos INSTRUCCIONES

DEFAULTCASE ::= Default DosPuntos INSTRUCCIONES

WHILE ::= While ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre

FOR ::= For ParentesisApertura INDICEFOR EXPRESION PuntoComa ACTUALIZACIONFOR ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre

INDICEFOR ::= DECLARACIONVARIABLE
    | ASIGNACIONVARIABLE

ACTUALIZACIONFOR ::= Id Asignacion EXPRESION
    | Id Incremento
    | Id Decremento

DOWHILE ::= Do LlaveApertura INSTRUCCIONES LlaveCierre While ParentesisApertura EXPRESION ParentesisCierre PuntoComa

BREAK ::= Break PuntoComa

CONTINUE ::= Continue PuntoComa

RETURN ::= Return PuntoComa
    | Return EXPRESION PuntoComa

PRINT ::= Print ParentesisApertura EXPRESION ParentesisCierre PuntoComa

CASTEO ::= ParentesisApertura TIPO ParentesisCierre EXPRESION 

TOLOWERUPPER ::= ToLower ParentesisApertura EXPRESION ParentesisCierre
    | ToUpper ParentesisApertura EXPRESION ParentesisCierre

LENGTH ::= Length ParentesisApertura EXPRESION ParentesisCierre

TRUNCATE ::= Truncate ParentesisApertura EXPRESION ParentesisCierre

ROUND ::= Round ParentesisApertura EXPRESION ParentesisCierre

TYPEOF ::= Typeof ParentesisApertura EXPRESION ParentesisCierre

TOSTRING: ToString ParentesisApertura EXPRESION ParentesisCierre

MAIN ::= Main LLAMADAFUNCION

TERNARIO ::= EXPRESION Ternario EXPRESION DosPuntos EXPRESION

TIPO ::= Int
    | Double 
    | Char 
    | String 
    | Boolean 
    | Void 

EXPRESION ::= ParentesisApertura EXPRESION ParentesisCierre
    | EXPRESION Suma EXPRESION 
    | EXPRESION Resta EXPRESION
    | EXPRESION Multiplicacion EXPRESION
    | EXPRESION Division EXPRESION
    | EXPRESION Potencia EXPRESION
    | EXPRESION Modulo EXPRESION
    | Resta EXPRESION
    | EXPRESION Igual EXPRESION
    | EXPRESION NoIgual EXPRESION
    | EXPRESION Menor EXPRESION
    | EXPRESION MenorIgual EXPRESION
    | EXPRESION Mayor EXPRESION
    | EXPRESION MayorIgual EXPRESION
    | EXPRESION Or EXPRESION
    | EXPRESION And EXPRESION
    | Not EXPRESION
    | Id Incremento
    | Id Decremento
    | Id ParentesisApertura ParentesisCierre
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre
    | ACCESOVECTOR
    | ACCESOLISTA
    | CASTEO
    | TOLOWERUPPER
    | TOSTRING
    | LENGTH
    | TRUNCATE
    | ROUND
    | TYPEOF
    | TERNARIO
    | Id 
    | Entero
    | Decimal
    | Caracter
    | Cadena
    | True
    | False
</code></pre>

### DESCRIPCIÓN 
<pre><code>
Se puede decir que la gramática utilizada está divida en dos secciones "INSTRUCCIONES" y "EXPRESION", esto debido a que para 
construir el interprete se utilizó el diseño patrón-interprete. La gramática inicia con el no terminal "INICIO" esta producción 
produce "INSTRUCCIONES" e "INSTRUCCIONES" produce "INSTRUCCION". "INSTRUCCION" da paso a un conjunto de producciones que 
precisamente corresponde a una sentencia o acción a ejecutar en nuestro lenguaje.

La mayoria de las producciones de "INSTRUCCION" están formadas por sentencias o acciones que debe retornar algún valor, entonces
hacen uso de la producción de "EXPRESION", estas producciones de "EXPRESION" corresponden justamente a una expresión en nuestro 
lenguaje, es decir una acción que debe devolver un valor, operaciones aritméticas, accessos a variables, llamadas a funciones. 

La gramática termina reduciendo a "INICIO" y "INICIO" no es más que el conjunto de instrucciones, sentencias o acciones escritas 
en el código de entrada analizado. Entonces como se utilizó el diseño cada instruccion dentro del conjunto de instrucciones
corresponde a una clase según el tipo de instrucción, que hereda de una clase abstracta "Instruccion". La clase "Instruccion"
ejecuta las sentencias o acciones que pueden ser de tipo "INSTRUCCION" o "EXPRESION", si se trata de una expresión, cada 
expresión corresponde a unca clase según el tipo de expresión, y esta clase hereda de una clase abstracta "Expresion" que 
ejecuta cada expresión siguiendo la lógica definada para cada tipo de expresión.

Para la construcción de la representación gráfica del árbol AST se usa está gramática en otro archivo diferente, en este archivo
se hace uso de una clase "Nodo" que se utiliza para guardar información acerca de las producciones y sus derivaciones. Como 
Jison es un interprete ascendente la gramática es recursiva por la izquierda y se construye de abajo hacia arriba. Aprovechando 
esto cada producción de la gramática guarda la información necesaria en un "Nodo" que pasa a la producción a la que va reduciendo 
cada una de las producciones de la gramática. Entonces al reducir a "INICIO" la información en la clase "Nodo" está guardada de 
forma que al recorrerla forma el gráfico del AST.
</code></pre>
