/* ========================= DEFINICIÓN LÉXICA ========================= */
%lex

%options case-insensitive
%x string

%%

/* =============== SÍMBOLOS RESERVADOS =============== */
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
//Operadores incremento y decremento
"++"                return "Incremento";
"--"                return "Decremento";
//Operador ternario
"?"                 return "Ternario";   
//OPerador de asignación
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