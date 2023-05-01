/* ========================= DEFINICIÓN LÉXICA ========================= */
%lex

%options case-insensitive
%x string

%%

/* =============== IGNORAR =============== */
\s+                                     {/* Espacios en blanco */}
(\/\/.*[^\n])                             {/* Comentario de una sola línea */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {/* Comentario multilínea */}

/* =============== SÍMBOLOS RESERVADOS =============== */
//Operadores incremento y decremento
"++"                return "Incremento";
"--"                return "Decremento";
//Operadores aritméticos
"+"                 return "Suma";
"-"                 return "Resta";   
"*"                 return "Multiplicacion";   
"/"                 return "Division";   
"^"                 return "Potencia";   
"%"                 return "Modulo";
//Operadores relacionales   
"=="                return "Igual";   
"!="                return "NoIgual";   
"<="                return "MenorIgual";   
">="                return "MayorIgual";
"<"                 return "Menor";   
">"                 return "Mayor";   
//Operadores lógicos
"||"                return "Or";   
"&&"                return "And";   
"!"                 return "Not";
//Operador ternario
"?"                 return "Ternario";   
//Operador de asignación
"="                 return "Asignacion";
//Símbolos
"("                 return "ParentesisApertura";
")"                 return "ParentesisCierre";
";"                 return "PuntoComa";
"{"                 return "LlaveApertura";
"}"                 return "LlaveCierre";
"["                 return "CorcheteApertura";
"]"                 return "CorcheteCierre";
","                 return "Coma";
":"                 return "DosPuntos";
"."                 return "Punto";


/* =============== PALABRAS RESERVADAS =============== */
//Tipos de datos
"int"               return "Int";
"double"            return "Double";
"string"            return "String";
"char"              return "Char";
"boolean"           return "Boolean";
"void"              return "Void";

"true"              return "True";
"false"             return "False";
//Sentencias de control
"if"                return "If";
"else"              return "Else";
"switch"            return "Switch";
"case"              return "Case";
"default"           return "Default";
//Sentencias cíclicas
"while"             return "While";
"for"               return "For";
"do"                return "Do";
//Sentencias de transferencia
"break"             return "Break";
"continue"          return "Continue";
"return"            return "Return";
//funciones nativas
"print"             return "Print";
"toString"          return "ToString";
"toLower"           return "ToLower";
"toUpper"           return "ToUpper";
"length"            return "Length";
"truncate"          return "Truncate";
"round"             return "Round";
"typeof"            return "Typeof";
"new"               return "New";
"list"              return "List";
"add"               return "Add";
"main"              return "Main";

/* =============== EXPRESIONES REGULARES =============== */
[a-zA-Z_]+[a-zA-Z0-9_]*             return "Id";
[0-9]+("."[0-9]+)\b                 return "Decimal";
[0-9]+\b                            return "Entero";
[\']([^\t\'\"\n]|(\\\")|(\\n)|(\\\')|(\\t)|(\\\\))?[\']         { yytext=yytext.substr(1,yyleng-2); return 'Caracter'; }
["]                             { cadena = ""; this.begin("string"); }
<string>[^"\\]+                 { cadena += yytext; }
<string>"\\\""                  { cadena += "\""; }
<string>"\\n"                   { cadena += "\n"; }
<string>"\\t"                   { cadena += "\t"; }
<string>"\\\\"                  { cadena += "\\"; }
<string>"\\\'"                  { cadena += "\'"; }
<string>["]                     { yytext = cadena; this.popState(); return 'Cadena'; }

/* =============== FINAL DEL ARCHIVO =============== */
<<EOF>>             return 'EOF';

/* =============== ERRORES LÉXICOS =============== */
.   { 
        console.log('Léxico en el árbol: ' + yytext + ', en la línea ' + yylloc.first_line + ' en la columna ' + (yylloc.first_column + 1)); 
        // const newError = new Error('Léxico', 'Carácter no reconocido: ' + yytext, yylloc.first_line, yylloc.first_column+1);
        // ListaErrores.push(newError);
    }
/lex


/* ========================= DEFINICIÓN SINTÁCTICA ========================= */
%{
    //const { Print } = require('../instructions/Print');
    //const { Primitive } = require('../expressions/Primitive');
    //const { Type, ArithmeticOperator, RelationalOperator, LogicalOperator } = require('../abstract/Return');
    // const { ArithmeticOperation } = require('../expressions/ArithmeticOperation');
    // const { RelationalOperation } = require('../expressions/RelationalOperation');
    // const { LogicalOperation } = require('../expressions/LogicalOperation');
    // const { VariableDeclaration }  = require('../instructions/VariableDeclaration');
    // const { Access } = require('../expressions/Access');
    // const { Assignment } = require('../instructions/Assignment');
    // const { IncrementDecrement } = require('../expressions/IncrementDecrement');
    // const { If } = require('../instructions/If');
    // const { While } = require('../instructions/While');
    // const { For } = require('../instructions/For');
    // const { DoWhile } = require('../instructions/DoWhile');
    // const { Break } = require('../instructions/Break');
    // const { Switch, Case, DefaultCase } = require('../instructions/Switch');
    // const { Statement } = require('../instructions/Statement');
    // const { Parameter } = require('../expressions/Parameter');
    // const { MethodFunction } = require('../instructions/FunctionDeclaration');
    // const { FunctionCall } = require('../expressions/FunctionCall');
    //const { InsReturn } = require('../instructions/InsReturn');
    // const { Error, ListaErrores } = require('../reports/Error');
    // const { Main } = require('../instructions/Main');
    const { Node } = require('../reports/Node');
    let nodo; //nodo raíz
    let respuesta; //json con la variable nodo
%}

/* =============== PRECEDENCIA DE OPERADORES =============== */
%left 'Ternario' 'DosPuntos'
%left 'Or'
%left 'And'
%right 'Not'
%left 'Igual' 'NoIgual' 'Menor' 'MenorIgual' 'Mayor' 'MayorIgual'
%left 'Suma' 'Resta'
%left 'Division' 'Multiplicacion' 'Modulo'
%nonassoc 'Potencia'
%right 'UNegacion'
%right 'ParentesisApertura' 'ParentesisCierre'
%right 'Incremento' 'Decremento'

/* =============== GRAMÁTICA =============== */
%start INICIO

%%

INICIO: INSTRUCCIONES EOF
    {
        nodo = new Node("AST", "AST");
        nodo.add($1.nodo)
        respuesta = {
            data: nodo
        }
        return respuesta;
    }
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION
    {
        nodo = $1.nodo;
        nodo.add($2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | INSTRUCCION
    {
        nodo = new Node("INSTRUCCIONES", "INSTRUCCIONES");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

INSTRUCCION: DECLARACIONVARIABLE 
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | ASIGNACIONVARIABLE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | INCREMENTARVARIABLE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | DECREMENTARVARIABLE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | DECLARACIONVECTOR
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;     
    }
    | ASIGNACIONVECTOR
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;     
    }
    | DECLARACIONLISTA
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | AGREGARLISTA
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | ASIGNACIONLISTA
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | DECLARACIONFUNCION
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | LLAMADAFUNCION
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | IF
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | SWITCH
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | WHILE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | FOR 
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | DOWHILE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | BREAK
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | CONTINUE
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | RETURN
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | PRINT
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | MAIN
    {
        nodo = new Node("INSTRUCCION", "INSTRUCCION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | error PuntoComa
    {
        console.error('Sintáctico en el árbol: ' + $1 + ', en la línea ' + @1.first_line + ' en la columna ' + (@1.first_column + 1));
        // const newError = new Error('Sintáctico', 'No se esperaba: ' + yytext, @1.first_line, @1.first_column+1);
        // ListaErrores.push(newError);
    }
;

/* =============== VARIABLES =============== */
DECLARACIONVARIABLE: TIPO Id Asignacion EXPRESION PuntoComa
    {
        nodo = new Node("DECLARACION VARIABLE", "DECLARACION VARIABLE");
        nodo.add($1.nodo, new Node("ID", $2), $4.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TIPO Id PuntoComa
    {
        nodo = new Node("DECLARACION VARIABLE", "DECLARACION VARIABLE");
        nodo.add($1.nodo, new Node("ID", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

ASIGNACIONVARIABLE: Id Asignacion EXPRESION PuntoComa
    {
        nodo = new Node("ASIGNACION VARIABLE", "ASIGNACION VARIABLE");
        nodo.add(new Node("ID", $1), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

INCREMENTARVARIABLE: Id Incremento PuntoComa
    {
        nodo = new Node("INCREMENTO", "INCREMENTO");
        nodo.add(new Node("ID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

DECREMENTARVARIABLE: Id Decremento PuntoComa
    {
        nodo = new Node("DECREMENTO", "DECREMENTO");
        nodo.add(new Node("ID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

/* =============== VECTORES =============== */
DECLARACIONVECTOR: TIPO CorcheteApertura CorcheteCierre Id Asignacion LlaveApertura LISTAVALORES LlaveCierre PuntoComa
    {
        nodo = new Node("DECLARACION VECTOR", "DECLARACION VECTOR");
        nodo.add($1.nodo, new Node("ID", $4), $7.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;
    }
    | TIPO CorcheteApertura CorcheteCierre Id Asignacion New TIPO CorcheteApertura EXPRESION CorcheteCierre PuntoComa
    {
        nodo = new Node("DECLARACION VECTOR", "DECLARACION VECTOR");
        nodo.add($1.nodo, new Node("ID", $4), $7.nodo, $9.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;
    }
;

LISTAVALORES: LISTAVALORES Coma EXPRESION
    {
        nodo = $1.nodo;
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION
    {
        nodo = new Node("LISTAVALORES", "LISTAVALORES");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

ASIGNACIONVECTOR: Id CorcheteApertura EXPRESION CorcheteCierre Asignacion EXPRESION PuntoComa
    {
        nodo = new Node("ASIGNACION VECTOR", "ASIGNACION VECTOR");
        nodo.add(new Node("ID", $1), $3.nodo, $6.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;
    }
;

/* =============== LISTAS =============== */
DECLARACIONLISTA: List Menor TIPO Mayor Id Asignacion New List Menor TIPO Mayor PuntoComa
    {
        nodo = new Node("DECLARACION LISTA", "DECLARACION LISTA");
        nodo.add($3.nodo, new Node("ID", $5), $10.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;      
    }
;

AGREGARLISTA: Id Punto Add ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        nodo = new Node("AGREGAR LISTA", "AGREGAR LISTA");
        nodo.add(new Node("ID", $1), $5.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;  
    }
;

ASIGNACIONLISTA: Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre Asignacion EXPRESION PuntoComa
    {
        nodo = new Node("ASIGNACION LISTA", "ASIGNACION LISTA");
        nodo.add(new Node("ID", $1), $4.nodo, $8.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;  
    }
;

ACCESOLISTA: Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre 
    { 
        nodo = new Node("ACCESO LISTA", "ACCESO LISTA");
        nodo.add(new Node("ID", $1), $4.nodo);
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta; 
    }
;

/* =============== FUNCIONES =============== */
DECLARACIONFUNCION: TIPO Id ParentesisApertura ParentesisCierre SENTENCIAS
    {
        nodo = new Node("DECLARACION FUNCION", "DECLARACION FUNCION");
        nodo.add($1.nodo, new Node("ID", $2), $5.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TIPO Id ParentesisApertura PARAMETROS ParentesisCierre SENTENCIAS
    {
        nodo = new Node("DECLARACION FUNCION", "DECLARACION FUNCION");
        nodo.add($1.nodo, new Node("ID", $2), $4.nodo, $6.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
;

SENTENCIAS: LlaveApertura INSTRUCCIONES LlaveCierre
    {
        nodo = new Node("SENTENCIAS", "SENTENCIAS");
        nodo.add($2.nodo)
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta
    }
;

PARAMETROS: PARAMETROS Coma PARAMETRO
    {
        nodo = $1.nodo;
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | PARAMETRO
    {
        nodo = new Node("PARAMETROS", "PARAMETROS");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

PARAMETRO: TIPO Id
    { 
        nodo = new Node("PARAMETRO", "PARAMETRO");
        nodo.add($1.nodo, new Node("ID", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

LLAMADAFUNCION: Id ParentesisApertura ParentesisCierre PuntoComa
    {
        nodo = new Node("LLAMADA FUNCION", "LLAMADA FUNCION");
        nodo.add(new Node("ID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre PuntoComa
    {
        nodo = new Node("LLAMADA FUNCION", "LLAMADA FUNCION");
        nodo.add(new Node("ID", $1), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

ARGUMENTOS: ARGUMENTOS Coma EXPRESION
    {
        nodo = $1.nodo;
        nodo.add($3.nodo)
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION 
    {
        nodo = new Node("ARGUMENTOS", "ARGUMENTOS");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;   
    }
;

/* =============== SENTENCIAS DE CONTROL =============== */
IF: If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else LlaveApertura INSTRUCCIONES LlaveCierre
    {
        nodo = new Node("IF", "IF");
        nodo.add($3.nodo, $6.nodo, $10.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else IF
    {
        nodo = new Node("IF", "IF");
        nodo.add($3.nodo, $6.nodo, $9.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        nodo = new Node("IF", "IF");
        nodo.add($3.nodo, $6.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

SWITCH: Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE DEFAULTCASE LlaveCierre
    {
        nodo = new Node("SWITCH", "SWITCH");
        nodo.add($3.nodo, $6.nodo, $7.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE LlaveCierre
    {
        nodo = new Node("SWITCH", "SWITCH");
        nodo.add($3.nodo, $6.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura DEFAULTCASE LlaveCierre
    {
        nodo = new Node("SWITCH", "SWITCH");
        nodo.add($3.nodo, $6.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

LISTACASE: LISTACASE CASE
    {
        nodo = $1.nodo
        nodo.add($2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | CASE
    {
        nodo = new Node("LISTA CASE", "LISTA CASE");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

CASE: Case EXPRESION DosPuntos INSTRUCCIONES 
    {
        nodo = new Node("CASE", "CASE");
        nodo.add($2.nodo, $4.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

DEFAULTCASE: Default DosPuntos INSTRUCCIONES
    {
        nodo = new Node("DEFAULT CASE", "DEFAULT CASE");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

/* =============== SENTENCIAS CÍCLICAS =============== */
WHILE: While ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        nodo = new Node("WHILE", "WHILE");
        nodo.add($3.nodo, $6.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

FOR: For ParentesisApertura INDICEFOR EXPRESION PuntoComa ACTUALIZACIONFOR ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        nodo = new Node("FOR", "FOR");
        nodo.add($3.nodo, $4.nodo, $6.nodo, $9.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }    
;

INDICEFOR: DECLARACIONVARIABLE  
    { 
        nodo = new Node("INDICEFOR", "INDICEFOR");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | ASIGNACIONVARIABLE 
    { 
        nodo = new Node("INDICEFOR", "INDICEFOR");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

ACTUALIZACIONFOR: Id Asignacion EXPRESION 
    { 
        nodo = new Node("ACTUALIZACIONFOR", "ACTUALIZACIONFOR");
        nodo.add(new Node("ID", $1), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id Incremento 
    { 
        nodo = new Node("ACTUALIZACIONFOR", "ACTUALIZACIONFOR");
        nodo.add(new Node("ID", $1), new Node("OPERADOR", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id Decremento 
    { 
        nodo = new Node("ACTUALIZACIONFOR", "ACTUALIZACIONFOR");
        nodo.add(new Node("ID", $1), new Node("OPERADOR", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

DOWHILE: Do LlaveApertura INSTRUCCIONES LlaveCierre While ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        nodo = new Node("DOWHILE", "DOWHILE");
        nodo.add($3.nodo, $7.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

/* =============== SENTENCIAS DE TRANSFERENCIA =============== */
BREAK: Break PuntoComa
    {
        nodo = new Node("BREAK", "BREAK");
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

CONTINUE: Continue PuntoComa
    {
        nodo = new Node("CONTINUE", "CONTINUE");
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;   

RETURN: Return PuntoComa
    {
        nodo = new Node("RETURN", "RETURN");
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Return EXPRESION PuntoComa
    {
        nodo = new Node("RETURN", "RETURN");
        nodo.add($2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

/* =============== FUNCIONES NATIVAS =============== */
PRINT: Print ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        nodo = new Node("PRINT", "PRINT");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

CASTEO: ParentesisApertura TIPO ParentesisCierre EXPRESION 
    { 
        nodo = new Node("CASTEO", "CASTEO");
        nodo.add($2.nodo, $4.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

TOLOWERUPPER: ToLower ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("TOLOWER", "TOLOWER");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | ToUpper ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("TOUPPER", "TOUPPER");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

LENGTH: Length ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("LENGTH", "LENGTH");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

TRUNCATE: Truncate ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("TRUNCATE", "TRUNCATE");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

ROUND: Round ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("ROUND", "ROUND");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

TYPEOF: Typeof ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("TYPEOF", "TYPEOF");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

TOSTRING: ToString ParentesisApertura EXPRESION ParentesisCierre
    {
        nodo = new Node("TOSTRING", "TOSTRING");
        nodo.add($3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

MAIN: Main LLAMADAFUNCION
    {
        nodo = new Node("MAIN", "MAIN");
        nodo.add($2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

/* =============== OPERADOR TERNARIO =============== */
TERNARIO: EXPRESION Ternario EXPRESION DosPuntos EXPRESION
    {
        nodo = new Node("TERNARIO", "TERNARIO");
        nodo.add($1.nodo, $3.nodo, $5.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

/* =============== EXPRESION =============== */
EXPRESION: ParentesisApertura EXPRESION ParentesisCierre 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Suma EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Resta EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Multiplicacion EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Division EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Potencia EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Modulo EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Resta EXPRESION %prec UNegacion 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("OPERADOR", $1), $2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }

    | EXPRESION Igual EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION NoIgual EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Menor EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION MenorIgual EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION Mayor EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION MayorIgual EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }

    | EXPRESION Or EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | EXPRESION And EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo, new Node("OPERADOR", $2), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Not EXPRESION 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("OPERADOR", $1), $2.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }

    | Id Incremento 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1), new Node("OPERADOR", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id Decremento 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1), new Node("OPERADOR", $2));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }

    | Id ParentesisApertura ParentesisCierre 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1), $3.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Id CorcheteApertura EXPRESION CorcheteCierre
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1), $3.nodo); 
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;
    }
    | ACCESOLISTA 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo); 
        respuesta = {
            nodo:nodo
        }
        $$ = respuesta;        
    }

    | CASTEO 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TOLOWERUPPER 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TOSTRING 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | LENGTH 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TRUNCATE 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | ROUND 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }
    | TYPEOF 
    { 
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta; 
    }

    |TERNARIO
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add($1.nodo);
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }

    | Id 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("ID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Entero 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("INT", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Decimal 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("DOUBLE", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Caracter 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("CHAR", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Cadena 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("STRING", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | True 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("BOOLEAN", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | False 
    {
        nodo = new Node("EXPRESION", "EXPRESION");
        nodo.add(new Node("BOOLEAN", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;

TIPO: Int 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("INT", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Double 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("DOUBLE", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Char 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("CHAR", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | String 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("STRING", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Boolean 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("BOOLEAN", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
    | Void 
    { 
        nodo = new Node("TIPO", "TIPO");
        nodo.add(new Node("VOID", $1));
        respuesta = {
            nodo: nodo
        }
        $$ = respuesta;
    }
;