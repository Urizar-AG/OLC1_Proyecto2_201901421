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
        //console.log('Léxico: ' + yytext + ', en la línea ' + yylloc.first_line + ' en la columna ' + (yylloc.first_column + 1)); 
        const newError = new Error('Léxico', 'Carácter no reconocido: ' + yytext, yylloc.first_line, yylloc.first_column+1);
        ListaErrores.push(newError);
    }
/lex


/* ========================= DEFINICIÓN SINTÁCTICA ========================= */
%{
    const { Print } = require('../instructions/Print');
    const { Primitive } = require('../expressions/Primitive');
    const { Type, ArithmeticOperator, RelationalOperator, LogicalOperator } = require('../abstract/Return');
    const { ArithmeticOperation } = require('../expressions/ArithmeticOperation');
    const { RelationalOperation } = require('../expressions/RelationalOperation');
    const { LogicalOperation } = require('../expressions/LogicalOperation');
    const { VariableDeclaration }  = require('../instructions/VariableDeclaration');
    const { Access } = require('../expressions/Access');
    const { Assignment } = require('../instructions/Assignment');
    const { IncrementDecrement } = require('../expressions/IncrementDecrement');
    const { If } = require('../instructions/If');
    const { While } = require('../instructions/While');
    const { For } = require('../instructions/For');
    const { DoWhile } = require('../instructions/DoWhile');
    const { Break } = require('../instructions/Break');
    const { Switch, Case, DefaultCase } = require('../instructions/Switch');
    const { Statement } = require('../instructions/Statement');
    const { Parameter } = require('../expressions/Parameter');
    const { MethodFunction } = require('../instructions/FunctionDeclaration');
    const { FunctionCall } = require('../expressions/FunctionCall');
    const { InsReturn } = require('../instructions/InsReturn');
    const { Error, ListaErrores } = require('../reports/Error');
    const { Cast } = require('../expressions/Cast');
    const { ToString } = require('../expressions/ToString');
    const { ToLowerUpper } = require('../expressions/ToLowerUpper');
    const { Length } = require('../expressions/Length');
    const { Truncate } = require('../expressions/Truncate');
    const { Round } = require('../expressions/Round');
    const { Typeof } = require('../expressions/Typeof');
    const { Ternary } = require('../expressions/Ternary');
    const { Continue } = require('../instructions/Continue');
    const { VectorDeclaration } = require('../instructions/VectorDeclaration');
    const { AccessStruct } = require('../expressions/AccessStruct');
    const { AssignmentStruct } = require('../instructions/AssignmentStruct');
    const { ListDeclaration } = require('../instructions/ListDeclaration');
    const { InsAdd } = require('../instructions/InsAdd');
    const { Main } = require('../instructions/Main');
    // const { ListaErrores } = require('../reports/ListaErrores')
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
        return $1;
    }
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION
    {
        $1.push($2);
        $$ = $1;
    }
    | INSTRUCCION
    {
        $$ = [$1];
    }
;

INSTRUCCION: DECLARACIONVARIABLE 
    {
        $$ = $1; 
    }
    | ASIGNACIONVARIABLE
    {
        $$ = $1;
    }
    | INCREMENTARVARIABLE
    {
        $$ = $1;
    }
    | DECREMENTARVARIABLE
    {
        $$ = $1;
    }
    | DECLARACIONVECTOR
    {
        $$ = $1;
    }
    | ASIGNACIONVECTOR
    {
        $$ = $1;
    }
    | DECLARACIONLISTA
    {
        $$ = $1;
    }
    | AGREGARLISTA
    {
        $$ = $1;
    }
    | ASIGNACIONLISTA
    {
        $$ = $1;
    }
    | DECLARACIONFUNCION
    {
        $$ = $1;
    }
    | LLAMADAFUNCION
    {
        $$ = $1;
    }
    | IF
    {
        $$ = $1;
    }
    | SWITCH
    {
        $$ = $1;
    }
    | WHILE
    {
        $$ = $1;
    }
    | FOR 
    {
        $$ = $1;
    }
    | DOWHILE
    {
        $$ = $1;
    }
    | BREAK
    {
        $$ = $1;
    }
    | CONTINUE
    {
        $$ = $1;
    }
    | RETURN
    {
        $$ = $1;
    }
    | PRINT
    {
        $$ = $1;
    }
    | MAIN
    {
        $$ = $1;
    }
    | error PuntoComa
    {
        //console.error('Sintáctico: ' + $1 + ', en la línea ' + @1.first_line + ' en la columna ' + (@1.first_column + 1));
        const newError = new Error('Sintáctico', 'No se esperaba: ' + yytext, @1.first_line, @1.first_column+1);
        ListaErrores.push(newError);
    }
;

/* =============== VARIABLES =============== */
DECLARACIONVARIABLE: TIPO Id Asignacion EXPRESION PuntoComa
    {
        $$ = new VariableDeclaration(@1.first_line, @1.first_column+1, $2, $4, $1);
    }
    | TIPO Id PuntoComa
    {
        $$ = new VariableDeclaration(@1.first_line, @1.first_column+1, $2, null, $1);
    }
;

ASIGNACIONVARIABLE: Id Asignacion EXPRESION PuntoComa
    {
        $$ = new Assignment(@1.first_line, @1.first_column+1, $1, $3);
    }
;

INCREMENTARVARIABLE: Id Incremento PuntoComa
    {
        $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2);
    }
;

DECREMENTARVARIABLE: Id Decremento PuntoComa
    {
        $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2);
    }
;

/* =============== VECTORES =============== */
DECLARACIONVECTOR: TIPO CorcheteApertura CorcheteCierre Id Asignacion LlaveApertura LISTAVALORES LlaveCierre PuntoComa
    {
        $$ = new VectorDeclaration(@1.first_line, @1.first_column+1, $1, $4, null, $7, 1);
    }
    | TIPO CorcheteApertura CorcheteCierre Id Asignacion New TIPO CorcheteApertura EXPRESION CorcheteCierre PuntoComa
    {
        $$ = new VectorDeclaration(@1.first_line, @1.first_column+1, $1, $4, $7, [$9], 2);
    }
;

LISTAVALORES: LISTAVALORES Coma EXPRESION
    {
        $1.push($3);
        $$ = $1;
    }
    | EXPRESION
    {
        $$ = [$1];
    }
;

ASIGNACIONVECTOR: Id CorcheteApertura EXPRESION CorcheteCierre Asignacion EXPRESION PuntoComa
    {
        $$ = new AssignmentStruct(@1.first_line, @1.first_column+1, $1, $3, $6);
    }
;

/* =============== LISTAS =============== */
DECLARACIONLISTA: List Menor TIPO Mayor Id Asignacion New List Menor TIPO Mayor PuntoComa
    {
        $$ = new ListDeclaration(@1.first_line, @1.first_column+1, $3, $5, $10);
    }
;

AGREGARLISTA: Id Punto Add ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        $$ = new InsAdd(@1.first_line, @1.first_column+1, $1, $5);
    }
;

ASIGNACIONLISTA: Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre Asignacion EXPRESION PuntoComa
    {
        $$ = new AssignmentStruct(@1.first_line+1, @1.first_column+1, $1, $4, $8);
    }
;

ACCESOLISTA: Id CorcheteApertura CorcheteApertura EXPRESION CorcheteCierre CorcheteCierre 
    { 
        $$ = new AccessStruct(@1.first_line, @1.first_column+1, $1, $4); 
    }
;

/* =============== FUNCIONES =============== */
DECLARACIONFUNCION: TIPO Id ParentesisApertura ParentesisCierre SENTENCIAS
    {
        $$ = new MethodFunction(@1.first_line, @1.first_column+1, $1, $2, [], $5);
    }
    | TIPO Id ParentesisApertura PARAMETROS ParentesisCierre SENTENCIAS
    {
        $$ = new MethodFunction(@1.first_line, @1.first_column+1, $1, $2, $4, $6);
    }
;

SENTENCIAS: LlaveApertura INSTRUCCIONES LlaveCierre
    {
        $$ = new Statement(@1.first_line, @1.first_column+1, $2);
    }
;

PARAMETROS: PARAMETROS Coma PARAMETRO
    {
        $1.push($3);
        $$ = $1;
    }
    | PARAMETRO
    {
        $$ = [$1];
    }
;

PARAMETRO: TIPO Id
    { $$ = new Parameter(@1.first_line, @1.first_column+1, $1, $2); }
;

LLAMADAFUNCION: Id ParentesisApertura ParentesisCierre PuntoComa
    {
        $$ = new FunctionCall(@1.first_line, @1.first_column+1, $1, []);
    }
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre PuntoComa
    {
        $$ = new FunctionCall(@1.first_line, @1.first_column+1, $1, $3);
    }
;

ARGUMENTOS: ARGUMENTOS Coma EXPRESION
    {
        $1.push($3);
        $$ = $1;
    }
    | EXPRESION 
    {
        $$ = [$1];
    }
;

/* =============== SENTENCIAS DE CONTROL =============== */
IF: If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else LlaveApertura INSTRUCCIONES LlaveCierre
    {
        $$ = new If(@1.first_line, @1.first_column+1, $3, $6, $10);
    }
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre Else IF
    {
        $$ = new If(@1.first_line, @1.first_column+1, $3, $6, $9);
    }
    | If ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        $$ = new If(@1.first_line, @1.first_column+1, $3, $6, null);
    }
;

SWITCH: Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE DEFAULTCASE LlaveCierre
    {
        $$ = new Switch(@1.first_line, @1.first_column+1, $3, $6, $7);
    }
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura LISTACASE LlaveCierre
    {
        $$ = new Switch(@1.first_line, @1.first_column+1, $3, $6, null);
    }
    | Switch ParentesisApertura EXPRESION ParentesisCierre LlaveApertura DEFAULTCASE LlaveCierre
    {
        $$ = new Switch(@1.first_line, @1.first_column+1, $3, null, $6);
    }
;

LISTACASE: LISTACASE CASE
    {
        $1.push($2);
        $$ = $1;
    }
    | CASE
    {
        $$ = [$1];
    }
;

CASE: Case EXPRESION DosPuntos INSTRUCCIONES 
    {
        $$ = new Case(@1.first_line, @1.first_column+1, $2, $4);
    }
;

DEFAULTCASE: Default DosPuntos INSTRUCCIONES
    {
        $$ = new DefaultCase(@1.first_line, @1.first_column+1, $3);
    }
;

/* =============== SENTENCIAS CÍCLICAS =============== */
WHILE: While ParentesisApertura EXPRESION ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        $$ = new While(@1.first_line, @1.first_column+1, $3, $6);
    }
;

FOR: For ParentesisApertura INDICEFOR EXPRESION PuntoComa ACTUALIZACIONFOR ParentesisCierre LlaveApertura INSTRUCCIONES LlaveCierre
    {
        $$ = new For(@1.first_line, @1.first_column+1, $3, $4, $6, $9);
    }
;

INDICEFOR: DECLARACIONVARIABLE  { $$ = $1; }
    | ASIGNACIONVARIABLE { $$ = $1; }
;

ACTUALIZACIONFOR: Id Asignacion EXPRESION { $$ = new Assignment(@1.first_line, @1.first_column+1, $1, $3); }
    | Id Incremento { $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2); }
    | Id Decremento { $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2); }
;

DOWHILE: Do LlaveApertura INSTRUCCIONES LlaveCierre While ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        $$ = new DoWhile(@1.first_line, @1.first_column+1, $3, $7);
    }
;

/* =============== SENTENCIAS DE TRANSFERENCIA =============== */
BREAK: Break PuntoComa
    {
        $$ = new Break(@1.first_line, @1.first_column+1);
    }
;

CONTINUE: Continue PuntoComa
    {
        $$ = new Continue(@1.first_line, @1.first_column+1);
    }
;

RETURN: Return PuntoComa
    {
        $$ = new InsReturn(@1.first_line, @1.first_column+1, null, Type.VOID);
    }
    | Return EXPRESION PuntoComa
    {
        $$ = new InsReturn(@1.first_line, @1.first_column+1, $2, Type.VOID);
    }
;

/* =============== FUNCIONES NATIVAS =============== */
PRINT: Print ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        $$ = new Print(@1.first_line, @1.first_column + 1, $3);
    }
;

CASTEO: ParentesisApertura TIPO ParentesisCierre EXPRESION 
    { 
        $$ = new Cast(@1.first_line, @1.first_column+1, $2, $4);
    }
;

TOLOWERUPPER: ToLower ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new ToLowerUpper(@1.first_line, @1.first_column+1, $3, 0);
    }
    | ToUpper ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new ToLowerUpper(@1.first_line, @1.first_column+1, $3, 1);
    }
;

LENGTH: Length ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new Length(@1.first_line, @1.first_column+1, $3);
    }
;

TRUNCATE: Truncate ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new Truncate(@1.first_line, @1.first_column+1, $3);
    }
;

ROUND: Round ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new Round(@1.first_line, @1.first_column+1, $3);
    }
;

TYPEOF: Typeof ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new Typeof(@1.first_line, @1.first_column+1, $3);
    }
;

TOSTRING: ToString ParentesisApertura EXPRESION ParentesisCierre
    {
        $$ = new ToString(@1.first_line, @1.first_column+1, $3);
    }
;

MAIN: Main LLAMADAFUNCION
    {
        $$ = new Main(@1.first_line, @1.first_column+1, $2);
    }
;

/* =============== OPERADOR TERNARIO =============== */
TERNARIO: EXPRESION Ternario EXPRESION DosPuntos EXPRESION
    {
        $$ = new Ternary(@1.first_line+1, @1.first_column, $1, $3, $5);
    }
;

/* =============== EXPRESION =============== */
EXPRESION: ParentesisApertura EXPRESION ParentesisCierre { $$ = $2; }
    | EXPRESION Suma EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.SUMA); }
    | EXPRESION Resta EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.RESTA); }
    | EXPRESION Multiplicacion EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.MULTIPLICACION); }
    | EXPRESION Division EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.DIVISION); }
    | EXPRESION Potencia EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.POTENCIA); }
    | EXPRESION Modulo EXPRESION {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $1, $3, ArithmeticOperator.MODULO); }
    | Resta EXPRESION %prec UNegacion {$$ = new ArithmeticOperation(@1.first_line, @1.first_column+1, $2, $2, ArithmeticOperator.NEGATIVO); }
    
    | EXPRESION Igual EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.IGUAL); }
    | EXPRESION NoIgual EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.NOIGUAL); }
    | EXPRESION Menor EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.MENOR); }
    | EXPRESION MenorIgual EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.MENORIGUAL); }
    | EXPRESION Mayor EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.MAYOR); }
    | EXPRESION MayorIgual EXPRESION { $$ = new RelationalOperation(@1.first_line, @1.first_column+1, $1, $3, RelationalOperator.MAYORIGUAL); }

    | EXPRESION Or EXPRESION { $$ = new LogicalOperation(@1.first_line, @1.first_column+1, $1, $3, LogicalOperator.OR );}
    | EXPRESION And EXPRESION { $$ = new LogicalOperation(@1.first_line, @1.first_column+1, $1, $3, LogicalOperator.AND );}
    | Not EXPRESION { $$ = new LogicalOperation(@1.first_line, @1.first_column+1, $2, $2, LogicalOperator.NOT );}

    | Id Incremento { $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2); }
    | Id Decremento { $$ = new IncrementDecrement(@1.first_line, @1.first_column+1, $1, $2); }

    | Id ParentesisApertura ParentesisCierre { $$ = new FunctionCall(@1.first_line, @1.first_column+1, $1, []); }
    | Id ParentesisApertura ARGUMENTOS ParentesisCierre { $$ = new FunctionCall(@1.first_line, @1.first_column+1, $1, $3); }
    | Id CorcheteApertura EXPRESION CorcheteCierre { $$ = new AccessStruct(@1.first_line, @1.first_column+1, $1, $3); }
    | ACCESOLISTA { $$ = $1; }

    | CASTEO { $$ = $1; }
    | TOLOWERUPPER { $$ = $1; }
    | TOSTRING { $$ = $1; }
    | LENGTH { $$ = $1; }
    | TRUNCATE { $$ = $1; }
    | ROUND { $$ = $1; }
    | TYPEOF { $$ = $1; }

    | TERNARIO { $$ = $1; }

    | Id { $$ = new Access(@1.first_line, @1.first_column+1, $1); }
    | Entero {$$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.INT);}
    | Decimal { $$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.DOUBLE);}
    | Caracter {$$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.CHAR);}
    | Cadena {$$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.STRING);}
    | True {$$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.BOOLEAN);}
    | False {$$ = new Primitive(@1.first_line, @1.first_column + 1, $1, Type.BOOLEAN);}
;

TIPO: Int { $$ = Type.INT }
    | Double { $$ = Type.DOUBLE }
    | Char { $$ = Type.CHAR }
    | String { $$ = Type.STRING }
    | Boolean { $$ = Type.BOOLEAN }
    | Void { $$ = Type.VOID }
;