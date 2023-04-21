/* ========================= DEFINICIÓN LÉXICA ========================= */
%lex

%options case-insensitive
%x string

%%

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

"true"              return "True";
"false"             return "False";
"if"                return "If";
"else"              return "Else";
"switch"            return "Switch";
"case"              return "Case";
"default"           return "Default";
"while"             return "While";
"for"               return "For";
"do"                return "Do";
"break"             return "Break";
"print"             return "Print";
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
<string>\s                      { cadena += " "; }
<string>"\\t"                   { cadena += "\t"; }
<string>"\\\\"                  { cadena += "\\"; }
<string>"\\\'"                  { cadena += "\'"; }
<string>["]                     { yytext = cadena; this.popState(); return 'Cadena'; }

/* =============== IGNORAR =============== */
\s+                                     {/* Espacios en blanco */}
(\/\/).*                                {/* Comentario de una sola línea */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {/* Comentario multilínea */}

/* =============== FINAL DEL ARCHIVO =============== */
<<EOF>>             return 'EOF';

/* =============== ERRORES LÉXICOS =============== */
.   { console.log('Léxico: ' + yytext + ', en la línea ' + yylloc.first_line + ' en la columna ' + (yylloc.first_column + 1)); }
/lex


/* ========================= DEFINICIÓN SINTÁCTICA ========================= */
%{
    const { Print } = require('../instruccions/Print');
    const { Primitive } = require('../expressions/Primitive');
    const { Type, ArithmeticOperator, RelationalOperator, LogicalOperator } = require('../abstract/Return');
    const { ArithmeticOperation } = require('../expressions/ArithmeticOperation');
    const { RelationalOperation } = require('../expressions/RelationalOperation');
    const { LogicalOperation } = require('../expressions/LogicalOperation');
    const { VariableDeclaration }  = require('../instruccions/VariableDeclaration');
    const { Access } = require('../expressions/Access');
    const { Assignment } = require('../instruccions/Assignment');
    const { IncrementDecrement } = require('../expressions/IncrementDecrement');
    const { If } = require('../instruccions/If');
    const { While } = require('../instruccions/While');
    const { For } = require('../instruccions/For');
    const { DoWhile } = require('../instruccions/DoWhile');
    const { Break } = require('../instruccions/Break');
    const { Switch, Case, DefaultCase } = require('../instruccions/Switch');
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
    | error PuntoComa
    {
        console.error('Sintáctico: ' + $1 + ', en la línea ' + @1.first_line + ' en la columna ' + (@1.first_column + 1));
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
    | FPRINT
    {
        $$ = $1;
    }
;

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

BREAK: Break PuntoComa
{
    $$ = new Break(@1.first_line, @1.first_column+1);
}
;

FPRINT: Print ParentesisApertura EXPRESION ParentesisCierre PuntoComa
    {
        $$ = new Print(@1.first_line, @1.first_column + 1, $3);
    }
;

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
;