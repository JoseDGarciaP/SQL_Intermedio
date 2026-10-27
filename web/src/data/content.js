// Contenido de la aplicación SQL Intermedio (UFPSO - GIPCO).
// Textos tomados de la app original de Android; consultas tomadas de los scripts .sql del repositorio.

const IMG = import.meta.env.BASE_URL + 'images/';
export const img = (name) => IMG + name;

export const APP = {
  title: 'SQL Intermedio',
  tagline: 'Joins, Funciones Agregadas y Subconsultas.',
  version: '1.0.0',
  repo: 'https://github.com/byroncuesta/SQL_Intermedio',
  ufpso: 'https://ufpso.edu.co/',
};

export const SECTIONS = [
  { id: 'joins', title: 'Joins', icon: img('inner.png'),
    desc: 'Cláusula que combina filas de dos o más tablas, mediante un campo común entre ellas.' },
  { id: 'agregados', title: 'Funciones Agregadas', icon: img('aggregade.png'),
    desc: 'Función que realiza un cálculo sobre un conjunto de valores de varias filas.' },
  { id: 'subconsultas', title: 'Subconsultas', icon: img('sql3.png'),
    desc: 'Una subconsulta es una consulta SQL anidada dentro de otra consulta.' },
  { id: 'ejercicios', title: 'Ejercicios', icon: img('quiz.png'),
    desc: 'Lista de ejercicios de SQL intermedio con su respectiva solución.' },
];

/* ------------------------------------------------------------------ JOINS */

const JOIN_EJEMPLO = (tipo) =>
  `Listar el nombre de todos los estudiantes y el nombre del curso en el que está matriculado cada uno de ellos, utilizando un ${tipo}.`;

export const JOINS = {
  intro: 'Cláusula que combina filas de dos o más tablas, mediante un campo común entre ellas.',
  schema: { img: img('escuela.png'), alt: 'Tablas ESTUDIANTE y CURSO de la BD escuela', caption: 'BD escuela: ESTUDIANTE (tabla A) y CURSO (tabla B). Notación: PK: #, FK: •.' },
  items: [
    {
      id: 'inner', title: 'Inner Join', icon: img('inner.png'),
      short: 'Devuelve las filas que tienen valores coincidentes en ambas tablas.',
      desc: 'Devuelve las filas que tienen valores coincidentes en ambas tablas.',
      syntax: 'SELECT <select list>\nFROM TableA A INNER JOIN TableB B\nON A.Key = B.Key;',
      example: JOIN_EJEMPLO('INNER JOIN'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nINNER JOIN escuela.curso c\nON (e.curso = c.curso);',
      note: 'Se listan los estudiantes y los cursos con valores coincidentes en los atributos relacionados (e.curso = c.curso) de las tablas estudiante y curso. El estudiante con código 1014 no tiene valores coincidentes en ambas tablas, por esa razón no se lista.',
    },
    {
      id: 'left', title: 'Left Join', icon: img('left.png'),
      short: 'Devuelve todas las filas de la tabla de la izquierda y las filas coincidentes de la tabla de la derecha.',
      desc: 'Devuelve todas las filas de la tabla de la izquierda y las filas coincidentes de la tabla de la derecha. Para las filas para las que no hay una fila coincidente en el lado derecho, el conjunto de resultados contendrá valor Nulo. LEFT JOIN también se conoce como LEFT OUTER JOIN.',
      syntax: 'SELECT <select list>\nFROM TableA A LEFT JOIN TableB B\nON A.Key = B.Key;',
      example: JOIN_EJEMPLO('LEFT JOIN'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nLEFT JOIN escuela.curso c\nON (e.curso = c.curso);',
      note: 'Se listan todos los estudiantes y los cursos, para aquellos que están ó no están matriculados en un curso. El estudiante con código 1014 se lista, pero contendrá un valor Nulo para la columna curso.',
    },
    {
      id: 'left-ex', title: 'Left Join con Exclusión', icon: img('left_ex.png'),
      short: 'Devuelve todas las filas de la tabla de la izquierda que no coinciden con ninguna fila de la tabla de la derecha.',
      desc: 'Devuelve todas las filas de la tabla de la izquierda que no coinciden con ninguna fila de la tabla de la derecha. Para las filas para las que no hay una fila coincidente en el lado derecho, el conjunto de resultados contendrá Nulo.',
      syntax: 'SELECT <select list>\nFROM TableA A LEFT JOIN TableB B\nON A.Key = B.Key\nWHERE B.Key IS NULL;',
      example: JOIN_EJEMPLO('LEFT JOIN con Exclusión'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nLEFT JOIN escuela.curso c\nON (e.curso = c.curso)\nWHERE c.curso IS NULL;',
      note: 'Se listan los estudiantes que no están matriculados en un curso. La columna curso contendrá un valor Nulo para cada caso.',
    },
    {
      id: 'right', title: 'Right Join', icon: img('right.png'),
      short: 'Devuelve todas las filas de la tabla de la derecha y las filas coincidentes de la tabla de la izquierda.',
      desc: 'Devuelve todas las filas de la tabla de la derecha y las filas coincidentes de la tabla de la izquierda. Para las filas para las que no hay una fila coincidente en el lado izquierdo, el conjunto de resultados contendrá Nulo. RIGHT JOIN también se conoce como RIGHT OUTER JOIN.',
      syntax: 'SELECT <select list>\nFROM TableA A RIGHT JOIN TableB B\nON A.Key = B.Key;',
      example: JOIN_EJEMPLO('RIGHT JOIN'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nRIGHT JOIN escuela.curso c\nON (e.curso = c.curso);',
      note: 'Se listan todos los estudiantes y los cursos, para aquellos que están matriculados en un curso y además, los cursos sin estudiantes matriculados. Los nombres de los cursos 04 y 05 se listan, pero contendrán un valor Nulo para la columna estudiante.',
    },
    {
      id: 'right-ex', title: 'Right Join con Exclusión', icon: img('right_ex.png'),
      short: 'Devuelve todas las filas de la tabla de la derecha que no coinciden con ninguna fila de la tabla de la izquierda.',
      desc: 'Devuelve todas las filas de la tabla de la derecha que no coinciden con ninguna fila de la tabla de la izquierda. Para las filas para las que no hay una fila coincidente en el lado izquierdo, el conjunto de resultados contendrá Nulo.',
      syntax: 'SELECT <select list>\nFROM TableA A RIGHT JOIN TableB B\nON A.Key = B.Key\nWHERE A.Key IS NULL;',
      example: JOIN_EJEMPLO('RIGHT JOIN con Exclusión'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nRIGHT JOIN escuela.curso c\nON (e.curso = c.curso)\nWHERE e.curso IS NULL;',
      note: 'Se listan los cursos que no tienen estudiantes matriculados. La columna estudiante contendrá un valor Nulo para cada caso.',
    },
    {
      id: 'full', title: 'Full Join', icon: img('full.png'),
      short: 'Devuelve las filas coincidentes y no coincidentes de ambas tablas.',
      desc: 'Devuelve todas las filas coincidentes y no coincidentes de ambas tablas. Para las filas para las que no hay coincidencia, el conjunto de resultados contendrá valores Nulo. FULL JOIN también se conoce como FULL OUTER JOIN.',
      syntax: 'SELECT <select list>\nFROM TableA A FULL JOIN TableB B\nON A.Key = B.Key;',
      example: JOIN_EJEMPLO('FULL JOIN'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nFULL JOIN escuela.curso c\nON (e.curso = c.curso);',
      note: 'Se listan todos los estudiantes y los cursos, para aquellos estudiantes que están matriculados en un curso, los estudiantes que no están matriculados en un curso y los cursos que no tienen estudiantes matriculados. En caso de que no haya valores coincidentes en los atributos relacionados de las tablas estudiante y curso, la columna estudiante o curso contendrá un valor Nulo según corresponda.',
    },
    {
      id: 'full-ex', title: 'Full Join con Exclusión', icon: img('full_ex.png'),
      short: 'Devuelve todas las filas de la tabla de la izquierda y todas las filas de la tabla de la derecha que no coinciden.',
      desc: 'Devuelve todas las filas de la tabla de la izquierda y todas las filas de la tabla de la derecha que no coinciden.',
      syntax: 'SELECT <select list>\nFROM TableA A FULL JOIN TableB B\nON A.Key = B.Key\nWHERE A.Key IS NULL\nOR B.Key IS NULL;',
      example: JOIN_EJEMPLO('FULL JOIN con Exclusión'),
      sql: 'SELECT e.nombre as estudiante, c.nombre as curso\nFROM escuela.estudiante e\nFULL JOIN escuela.curso c\nON (e.curso = c.curso)\nWHERE e.curso IS NULL\nOR c.curso IS NULL;',
      note: 'Se listan los estudiantes que no están matriculados en un curso y los cursos que no tienen estudiantes matriculados. La columna estudiante o curso contendrá un valor Nulo según corresponda.',
    },
  ],
};

/* ------------------------------------------------------- FUNCIONES AGREGADAS */

const NULL_DISTINCT = 'ignora los valores NULL y los valores repetidos los toma una sola vez.';

export const AGREGADOS = {
  intro: 'Función que realiza un cálculo sobre un conjunto de valores de varias filas.',
  context: 'Suponiendo que se tiene una tabla que contiene información sobre productos de una tienda de frutas. Las filas de la tabla PRODUCTO son similares a las siguientes.',
  schema: { img: img('producto.png'), alt: 'Tabla PRODUCTO de la BD tienda', caption: 'BD tienda: tabla PRODUCTO. Notación: PK: #.' },
  items: [
    {
      id: 'count', title: 'Función Count()', icon: img('counter.png'),
      short: 'Devuelve el número total de valores en una columna dada.',
      desc: 'La función agregada COUNT() devuelve el número total de filas de una tabla. También puede usarse para retornar el total del número de filas que correspondan con una expresión.',
      syntax: 'COUNT( { [ALL | DISTINCT ] expression ] | * } )',
      queries: [
        { q: 'Contar el número de filas de la tabla PRODUCTO.',
          sql: 'SELECT COUNT(*)\nFROM tienda.producto;',
          note: 'La consulta retorna el total del número de filas. COUNT(*), no ignora los valores NULL.' },
        { q: 'Contar los valores de los precios de la tabla PRODUCTO.',
          sql: 'SELECT COUNT(precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el número de filas. COUNT(precio), ignora los valores NULL.' },
        { q: 'Contar los valores de los precios, dónde los precios sean únicos en la tabla PRODUCTO.',
          sql: 'SELECT COUNT(DISTINCT precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el número de filas. COUNT(DISTINCT precio), ignora los valores NULL y los valores repetidos los cuenta una sola vez.' },
      ],
    },
    {
      id: 'min', title: 'Función Min()', icon: img('min.png'),
      short: 'Devuelve el valor más pequeño en una columna dada.',
      desc: 'La función agregada MIN() devuelve el valor más pequeño de una columna dada.',
      syntax: 'MIN ( [ ALL | DISTINCT ] expression )',
      queries: [
        { q: 'Listar el precio mínimo de todos los productos.',
          sql: 'SELECT MIN(precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el valor mínimo de todos los precios. MIN(precio), ignora los valores NULL.' },
        { q: 'Listar el precio mínimo de todos los productos, dónde los precios sean únicos.',
          sql: 'SELECT MIN(DISTINCT precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el valor mínimo de los precios. MIN(DISTINCT precio), ' + NULL_DISTINCT },
        { q: 'Listar el valor mínimo de todos los productos, dónde la descripción del producto inicie con la letra "P".',
          sql: "SELECT MIN(precio)\nFROM tienda.producto\nWHERE nombre LIKE 'P%';",
          note: 'La consulta filtra las filas basado en la cláusula WHERE y retorna el valor mínimo de los precios. MIN(precio), ignora los valores NULL.' },
      ],
    },
    {
      id: 'max', title: 'Función Max()', icon: img('max.png'),
      short: 'Devuelve el valor más grande en una columna dada.',
      desc: 'La función agregada MAX() devuelve el valor más grande en una columna dada.',
      syntax: 'MAX ( [ ALL | DISTINCT ] expression )',
      queries: [
        { q: 'Listar el precio máximo de todos los productos.',
          sql: 'SELECT MAX(precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el valor máximo de todos los precios. MAX(precio), ignora los valores NULL.' },
        { q: 'Listar el precio máximo de todos los productos, dónde los precios sean únicos.',
          sql: 'SELECT MAX(DISTINCT precio)\nFROM tienda.producto;',
          note: 'La consulta retorna el valor máximo de los precios. MAX(DISTINCT precio), ' + NULL_DISTINCT },
        { q: 'Listar el valor máximo de todos los productos, dónde la descripción del producto inicie con la letra "P".',
          sql: "SELECT MAX(precio)\nFROM tienda.producto\nWHERE nombre LIKE 'P%';",
          note: 'La consulta filtra las filas basado en la cláusula WHERE y retorna el valor máximo de los precios. MAX(precio), ignora los valores NULL.' },
      ],
    },
    {
      id: 'sum', title: 'Función Sum()', icon: img('sum.png'),
      short: 'Devuelve la suma de los valores numéricos en una columna dada.',
      desc: 'La función agregada SUM() devuelve la suma de los valores numéricos en una columna dada.',
      syntax: 'SUM ( [ ALL | DISTINCT ] expression )',
      queries: [
        { q: 'Listar la suma de los precios de todos los productos.',
          sql: 'SELECT SUM(precio)\nFROM tienda.producto;',
          note: 'La consulta retorna la suma de todos los precios. SUM(precio), ignora los valores NULL.' },
        { q: 'Listar la suma de los precios de todos los productos, dónde los precios sean únicos.',
          sql: 'SELECT SUM(DISTINCT precio)\nFROM tienda.producto;',
          note: 'La consulta retorna la suma de los precios. SUM(DISTINCT precio), ' + NULL_DISTINCT },
        { q: 'Listar la suma de los precios de todos los productos, dónde la descripción del producto inicie con la letra "P".',
          sql: "SELECT SUM(precio)\nFROM tienda.producto\nWHERE nombre LIKE 'P%';",
          note: 'La consulta filtra las filas basado en la cláusula WHERE y retorna la suma de los precios. SUM(precio), ignora los valores NULL.' },
      ],
    },
    {
      id: 'avg', title: 'Función Avg()', icon: img('average.png'),
      short: 'Devuelve el promedio de los valores de una columna dada.',
      desc: 'La función agregada AVG() devuelve el promedio de una expresión dada.',
      syntax: 'AVG ( [ ALL | DISTINCT ] expression )',
      queries: [
        { q: 'Listar el precio promedio de todos los productos. Redondear la salida sin decimales.',
          sql: 'SELECT ROUND(AVG(precio),0) as promedio\nFROM tienda.producto;',
          note: 'La consulta retorna el promedio de todos los precios. AVG(precio), ignora los valores NULL. La función ROUND() en PostgreSQL, devuelve un número redondeado hacia su entero más próximo o si se especifica el segundo argumento, se redondea hacia el número entero más próximo teniendo en cuenta el número de decimales especificado.' },
        { q: 'Listar el precio promedio de todos los productos, dónde los precios sean únicos. Redondear la salida a un decimal.',
          sql: 'SELECT ROUND(AVG(DISTINCT precio),1) as promedio\nFROM tienda.producto;',
          note: 'La consulta retorna el promedio de los precios. AVG(DISTINCT precio), ' + NULL_DISTINCT },
        { q: 'Listar el precio promedio de todos los productos, dónde la descripción del producto inicie con la letra "P". Redondear la salida sin decimales.',
          sql: "SELECT ROUND(AVG(precio),0) as promedio\nFROM tienda.producto\nWHERE nombre LIKE 'P%';",
          note: 'La consulta filtra las filas basado en la cláusula WHERE y retorna el promedio de los precios. AVG(precio), ignora los valores NULL.' },
      ],
    },
    {
      id: 'groupby', title: 'Cláusula Group by', icon: img('groupby.png'),
      short: 'Agrupa las filas y permite aplicar funciones agregadas a cada grupo.',
      desc: 'La cláusula GROUP BY, agrupa las filas que contienen datos en las columnas especificadas y permite que se realicen funciones agregadas en una o más columnas.',
      syntax: 'SELECT column_1, ..., aggregate_function()\nFROM table_name\nGROUP BY column_1, ...;',
      queries: [
        { q: 'Listar la referencia de los productos y la suma de los precios de los productos agrupados por referencia. Ordenar de forma descendente por la suma de los precios de los productos.',
          sql: 'SELECT ref as referencia, SUM(precio) as total\nFROM tienda.producto\nGROUP BY ref\nORDER BY SUM(precio) DESC;',
          note: 'La consulta retorna la suma de los precios agrupados por referencia. SUM(precio), ignora los valores NULL.' },
      ],
    },
    {
      id: 'having', title: 'Cláusula Having', icon: img('having.png'),
      short: 'Permite especificar condiciones a la cláusula Group by.',
      desc: 'La cláusula HAVING, permite definir condiciones para la cláusula GROUP BY. Las filas que se seleccionen se basan en las condiciones que se especifiquen. La cláusula HAVING debe seguir a la cláusula GROUP BY.',
      syntax: 'SELECT column_1, ..., aggregate_function()\nFROM table_name\nGROUP BY column_1, ...\nHAVING condition;',
      queries: [
        { q: 'Listar la referencia de los productos y la suma de los precios de los productos agrupados por referencia, dónde la suma de los precios de los productos sea mayor ó igual a 7000 pesos. Ordenar de forma descendente por la suma de los precios de los productos.',
          sql: 'SELECT ref as referencia, SUM(precio) as total\nFROM tienda.producto\nGROUP BY ref\nHAVING SUM(precio) >= 7000\nORDER BY SUM(precio) DESC;',
          note: 'La consulta calcula la suma de los precios agrupados por referencia. Luego, aplica una condición para el valor de la suma de los precios y lista sólo esas filas. SUM(precio), ignora los valores NULL.' },
      ],
    },
  ],
};

/* ------------------------------------------------------------ SUBCONSULTAS */

export const SUBCONSULTAS = {
  intro: 'Una subconsulta es una consulta SQL anidada dentro de otra consulta. La consulta externa se denomina consulta principal y la consulta interna se denomina subconsulta. Generalmente la subconsulta se ejecuta primero. No hay una sintaxis general. A continuación se muestra la sintaxis para subconsultas que se usan con mayor frecuencia.',
  syntax: 'SELECT column_name\nFROM table_name\nWHERE column_name OPERATOR\n(SELECT column_name from table_name WHERE ...);',
  rules: [
    'Las subconsultas deben estar entre paréntesis.',
    'Las subconsultas se colocan al lado derecho del operador de comparación.',
    'Se puede colocar la Subconsulta en varias cláusulas SQL: WHERE, HAVING ó FROM.',
    'Las subconsultas se pueden usar con las declaraciones SELECT, UPDATE, INSERT ó DELETE junto con un operador de expresión tipo escalar, es decir se comparan con valores únicos como: =, >, <, >=, <=, <> ó con operadores que devuelven valores múltiples como: IN, NOT IN, ANY, SOME, ALL, EXISTS.',
    'Si el resultado de la subconsulta se compara con una o varias columnas, el número de columnas debe coincidir.',
    'El comando ORDER BY no se puede usar en una subconsulta, aunque la consulta principal puede usar ORDER BY. El comando GROUP BY se puede utilizar para realizar la misma función que ORDER BY en una subconsulta.',
    'El operador BETWEEN ó LIKE no se pueden utilizar con una subconsulta. Sin embargo, el operador BETWEEN y LIKE se puede utilizar dentro de la subconsulta.',
  ],
  schema: { img: img('empleado.png'), alt: 'Tabla EMPLEADO de la BD empresa', caption: 'BD empresa: tabla EMPLEADO. Notación: PK: #, FK: •.' },
  items: [
    {
      id: 'where', title: 'Subconsulta en la cláusula WHERE ó HAVING',
      desc: 'Se usa la subconsulta para filtrar un conjunto de resultados en la cláusula WHERE ó HAVING. Por ejemplo, la siguiente consulta devuelve el nombre de todos los empleados con un salario por debajo del salario promedio.',
      sql: 'SELECT nombre as empleado\nFROM empresa.empleado\nWHERE salario <\n(SELECT ROUND(AVG(salario),0) FROM empresa.empleado);',
      note: 'La subconsulta (SELECT ROUND(AVG(salario),0) FROM empresa.empleado), devuelve un valor escalar igual a 3000 dólares y se usa para especificar la condición en la cláusula WHERE.',
    },
    {
      id: 'from', title: 'Subconsulta en la cláusula FROM',
      desc: 'Se usa la subconsulta para definir una tabla temporal y usarla en la cláusula FROM. Por ejemplo, la siguiente consulta devuelve el nombre de los empleados que tienen un jefe que gana 3000 dólares. Ordenar por el nombre del empleado de forma descendente.',
      sql: 'SELECT e1.nombre as empleado\nFROM empresa.empleado e1 INNER JOIN\n(SELECT nombre, id_emp FROM empresa.empleado WHERE salario = 3000) e2\nON (e1.id_jefe = e2.id_emp)\nORDER BY e1.nombre DESC;',
      note: 'La subconsulta devuelve el nombre y el ID de los empleados que ganan 3000 dólares (MARY LOPEZ y ANA GOMEZ). Luego, la consulta principal hace un JOIN entre el ID_jefe con el ID de los empleados devueltos en la subconsulta y así emparejar los valores coincidentes (e1.id_jefe = e2.id_emp) para buscar el nombre del empleado que tenga a ese empleado como jefe.',
    },
    {
      id: 'select', title: 'Subconsulta en la cláusula SELECT',
      desc: 'Las subconsultas también se pueden usar en la declaración SELECT de la consulta externa. Por ejemplo, la siguiente consulta devuelve el nombre del jefe del empleado con menor salario.',
      sql: 'SELECT (SELECT nombre FROM empresa.empleado WHERE id_emp = e.id_jefe) as jefe\nFROM empresa.empleado e\nWHERE e.salario =\n(SELECT MIN(salario) FROM empresa.empleado);',
      note: 'La subconsulta en la cláusula WHERE retorna un valor escalar de 2000 dólares (menor salario). La subconsulta a nivel del SELECT principal, busca el nombre de los jefes de los empleados. La consulta principal, lista el nombre de los jefes de aquellos empleados con un salario igual a 2000 dólares.',
    },
  ],
};

/* -------------------------------------------------------------- EJERCICIOS */

export const EJERCICIOS = {
  intro: 'Lista de ejercicios de SQL intermedio con su respectiva solución.',
  context: 'Los ejercicios usan la base de datos de un supermercado con clientes, productos, pedidos y el detalle de cada pedido.',
  schema: { img: img('super_cliente.png'), alt: 'Tablas CLIENTE, PEDIDO, PRODUCTO y DETALLE_PEDIDO de la BD supermarket', caption: 'BD supermarket. Notación: PK: #, FK: •.' },
  items: [
    {
      n: 1, title: 'Productos con mayor precio', topics: 'Joins · Subconsultas · MAX()',
      q: 'Listar el nombre y el precio del producto con el precio igual al mayor precio de los productos actuales, dónde el producto se haya pedido en enero de 2022. Ordenar por el nombre del producto.',
      sql: "SELECT p.nombre, p.precio\nFROM supermarket.producto p INNER JOIN supermarket.detalle_pedido d\nON (p.ref = d.ref)\nAND (p.pro = d.id_pro)\nINNER JOIN supermarket.pedido pe\nON (d.id_ped = pe.id_ped)\nWHERE p.precio = (SELECT MAX(precio) FROM supermarket.producto)\nAND pe.fecha BETWEEN '01/01/2022' AND '31/01/2022'\nORDER BY 1;",
      note: 'La consulta hace un JOIN entre las tablas PRODUCTO, DETALLE_PEDIDO y PEDIDO, luego hace una subconsulta para filtrar el precio del producto con máximo valor y filtra la fecha del pedido. Finalmente lista el nombre y el precio de los productos que cumplan con las condiciones.',
    },
    {
      n: 2, title: 'Productos pedidos por año', topics: 'Joins · SUM() · Group by',
      q: 'Listar el año y la cantidad de productos pedidos por año. Ordenar en forma descendente por el año.',
      sql: 'SELECT extract(YEAR FROM p.fecha) as año, SUM(d.cant) as cantidad\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON (p.id_ped = d.id_ped)\nGROUP BY extract(YEAR FROM p.fecha)\nORDER BY 1;',
      note: 'La consulta hace una unión entre las tablas PEDIDO y DETALLE_PEDIDO, luego agrupa por año y calcula la cantidad sumando los valores correspondientes a cada año. Al final lista el año y la cantidad. La función EXTRACT() extrae un campo de un valor de fecha/hora.',
      link: { href: 'https://www.postgresql.org/docs/current/functions-datetime.html', label: 'Ver EXTRACT() en la documentación de PostgreSQL' },
    },
    {
      n: 3, title: 'Pedidos con más de un producto', topics: 'COUNT() · Group by · Having',
      q: 'Listar los pedidos y cuántos se pidieron, si el pedido incluyó más de un producto.',
      sql: 'SELECT id_ped, COUNT(id_ped) as cantidad\nFROM supermarket.detalle_pedido\nGROUP BY id_ped\nHAVING COUNT(id_ped) > 1\nORDER BY 1;',
      note: 'La consulta agrupa por los pedidos, luego filtra la agrupación usando Having y así verifica que el conteo de pedidos sea mayor a 1. Al final lista el pedido y la cantidad de productos pedidos con la función Count().',
    },
    {
      n: 4, title: 'Productos que no han sido pedidos', topics: 'Subconsultas · NOT IN',
      q: 'Listar el nombre y la unidad de medida de los productos que nunca se han pedido. Ordenar por el nombre del producto.',
      sql: 'SELECT nombre as producto, uni as unidad_medida\nFROM supermarket.producto\nWHERE (ref,pro) NOT IN\n(SELECT ref,id_pro FROM supermarket.detalle_pedido)\nORDER BY 1;',
      alt: { label: 'Solución equivalente con LEFT JOIN', sql: 'SELECT p.nombre as producto, p.uni as unidad_medida\nFROM supermarket.producto p\nLEFT JOIN supermarket.detalle_pedido d\nON (p.ref = d.ref)\nAND (p.pro = d.id_pro)\nWHERE d.ref IS NULL\nAND d.id_pro IS NULL\nORDER BY 1;' },
      note: 'La consulta lista el nombre y la unidad de medida de los productos, para aquellos que no se encuentren en la tabla Detalle_Pedido. Tener presente la forma de relacionar los atributos de ambas tablas, ya que la PK y FK representan una llave compuesta.',
    },
    {
      n: 5, title: 'Productos más pedidos', topics: 'SUM() · Subconsulta correlacionada',
      q: 'Listar el nombre y el total de los productos más pedidos, dónde el total de los productos pedidos sea mayor a 5. Ordenar por el total de los productos pedidos de forma descendente.',
      sql: 'SELECT p.nombre as producto,\n(SELECT SUM(d.cant)\nFROM supermarket.detalle_pedido d\nWHERE d.ref = p.ref\nAND d.id_pro = p.pro) as cantidad\nFROM supermarket.producto p\nGROUP BY p.ref, p.pro\nHAVING (SELECT SUM(d.cant)\nFROM supermarket.detalle_pedido d\nWHERE d.ref = p.ref\nAND d.id_pro = p.pro) > 5\nORDER BY 2 DESC;',
      note: 'La consulta lista el nombre de los productos más pedidos y su cantidad. La salida del resultado anterior es filtrada, listando sólo aquellos productos dónde el total de los productos pedidos sea mayor a 5. Esta consulta utiliza una subconsulta correlacionada, que se ve como una subconsulta interna que está ubicada a nivel del select principal para hallar la cantidad de los productos más pedidos, utiliza las columnas externas p.ref y p.pro de la consulta padre. Las subconsultas correlacionadas hacen referencia a columnas de la consulta padre.',
    },
    {
      n: 6, title: 'Productos con precio superior al precio promedio', topics: 'Subconsultas · AVG()',
      q: 'Listar el nombre y precio de los productos actuales con precio superior al precio promedio de los productos pedidos en el año 2022.',
      sql: "SELECT nombre as producto, precio\nFROM supermarket.producto\nWHERE precio >\n(SELECT AVG(d.vlr_unit)\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON p.id_ped = d.id_ped\nWHERE p.fecha BETWEEN '01/01/2022' AND '31/12/2022');",
      note: 'La consulta lista el nombre y precio de los productos, a través de filtrar el precio del producto mediante una subconsulta que devuelve un valor escalar que representa el promedio del precio de los productos pedidos en el año 2022.',
    },
    {
      n: 7, title: 'Clientes y cantidad de pedidos por cliente', topics: 'Joins · COUNT() · Group by · Having',
      q: 'Listar el nombre de los clientes y la cantidad de pedidos, dónde la cantidad de pedidos por cliente sea mayor a la cantidad de clientes sin pedidos. Ordenar por la cantidad de pedidos de forma descendente.',
      sql: 'SELECT c.nombre as cliente, COUNT(p.id_ped) as cantidad\nFROM supermarket.pedido p INNER JOIN supermarket.cliente c\nON p.id_c = c.id_c\nGROUP BY c.nombre\nHAVING COUNT(p.id_ped) >\n(SELECT COUNT(*)\nFROM supermarket.cliente c LEFT JOIN supermarket.pedido p\nON c.id_c = p.id_c\nWHERE p.id_c IS NULL)\nORDER BY 2 DESC;',
      note: 'La consulta devuelve los clientes y la cantidad de pedidos por cliente, que cumplen con la condición dispuesta en la cláusula HAVING, la cual utiliza una subconsulta que devuelve un valor escalar, calculado a partir de la cantidad de clientes sin pedidos. La cantidad de clientes sin pedido da como resultado 1.',
    },
    {
      n: 8, title: 'Pedidos por mes de un año', topics: 'Subconsultas · COUNT() · Group by · Having',
      q: 'Listar el mes y la cantidad de pedidos por mes del segundo semestre del año 2022, dónde la cantidad de pedidos sea menor o igual a la cantidad de pedidos del año 2023.',
      sql: "SELECT EXTRACT(MONTH FROM fecha) as mes, COUNT(id_ped) as cantidad\nFROM supermarket.pedido p\nWHERE fecha BETWEEN '01/07/2022' AND '31/12/2022'\nGROUP BY EXTRACT(MONTH FROM fecha)\nHAVING COUNT(id_ped) <=\n(SELECT COUNT(id_ped)\nFROM supermarket.pedido\nWHERE fecha BETWEEN '01/01/2023' AND '31/12/2023');",
      note: 'La consulta utiliza la función EXTRACT para recuperar el subcampo mes del atributo fecha y así agrupar para hallar el mes y la cantidad de pedidos por mes de julio a diciembre de 2022, a partir de una condición mediante el uso de la cláusula HAVING y una subconsulta que cuenta el número de pedidos en el año 2023. La cantidad de pedidos en 2023 da como resultado 3.',
    },
    {
      n: 9, title: 'Subconsulta con la cláusula ANY', topics: 'Subconsultas · ANY · IN',
      q: 'Listar el nombre y el sexo de los clientes que hayan realizado pedidos de papaya.',
      sql: "SELECT DISTINCT nombre, sexo\nFROM supermarket.cliente\nWHERE id_c = ANY\n(SELECT p.id_c\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON p.id_ped = d.id_ped\nINNER JOIN supermarket.producto pr\nON d.ref = pr.ref\nAND d.id_pro = pr.pro\nWHERE pr.nombre = 'PAPAYA');",
      alt: { label: 'Solución equivalente con la cláusula IN', sql: "SELECT DISTINCT nombre, sexo\nFROM supermarket.cliente\nWHERE id_c IN\n(SELECT p.id_c\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON p.id_ped = d.id_ped\nINNER JOIN supermarket.producto pr\nON d.ref = pr.ref\nAND d.id_pro = pr.pro\nWHERE pr.nombre = 'PAPAYA');" },
      note: 'La subconsulta busca los clientes que han realizado pedidos de "PAPAYA" y luego la consulta principal selecciona el nombre y el sexo de los clientes que han pedido esa fruta. Se puede crear una subconsulta dónde se utiliza la cláusula ANY junto con operadores de comparación (=, <>, >, >=, < o <=) para recuperar más de un valor. En una subconsulta se puede utilizar la cláusula “IN” en lugar de la cláusula “= ANY”.',
    },
    {
      n: 10, title: 'Subconsulta con NOT EXISTS', topics: 'Subconsultas · NOT EXISTS',
      q: 'Listar el nombre y la unidad de medida de los productos que no se han pedido a la fecha.',
      sql: 'SELECT p.nombre as producto, p.uni as unidad_medida\nFROM supermarket.producto p\nWHERE NOT EXISTS\n(SELECT ref, id_pro\nFROM supermarket.detalle_pedido d\nWHERE d.ref = p.ref\nAND d.id_pro = p.pro);',
      note: 'La consulta externa lista el nombre y la unidad de medida de los productos, a través de filtrar el resultado verificando que no hayan registros correspondientes con la salida de una subconsulta que utiliza la correlación entre la PK de la tabla producto (externa) y la FK de la tabla Detalle_Pedido (interna).',
    },
    {
      n: 11, title: 'Subconsulta con la cláusula ALL', topics: 'Subconsultas · ALL · NOT IN',
      q: 'Listar el nombre y el sexo de los clientes que no hayan realizado pedidos de papaya.',
      sql: "SELECT DISTINCT nombre, sexo\nFROM supermarket.cliente\nWHERE id_c <> ALL\n(SELECT p.id_c\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON p.id_ped = d.id_ped\nINNER JOIN supermarket.producto pr\nON d.ref = pr.ref\nAND d.id_pro = pr.pro\nWHERE pr.nombre = 'PAPAYA'\nAND p.id_c IS NOT NULL);",
      alt: { label: 'Solución equivalente con la cláusula NOT IN', sql: "SELECT DISTINCT nombre, sexo\nFROM supermarket.cliente\nWHERE id_c NOT IN\n(SELECT p.id_c\nFROM supermarket.pedido p INNER JOIN supermarket.detalle_pedido d\nON p.id_ped = d.id_ped\nINNER JOIN supermarket.producto pr\nON d.ref = pr.ref\nAND d.id_pro = pr.pro\nWHERE pr.nombre = 'PAPAYA'\nAND p.id_c IS NOT NULL);" },
      note: 'La subconsulta busca los clientes que han realizado pedidos de papaya y luego la consulta principal selecciona el nombre y el sexo de los clientes que no han pedido esa fruta. Se puede crear una subconsulta dónde se utiliza la cláusula ALL junto con operadores de comparación (=, <>, >, >=, < o <=) para recuperar todos los valores. En una subconsulta se puede utilizar la cláusula “NOT IN” en lugar de la cláusula “<> ALL”. IMPORTANTE: Si hay un valor NULL en el resultado de la consulta interna, la consulta externa no devuelve ningún valor. La forma de solucionar es quitar los valores NULL de la consulta interna (AND p.id_c IS NOT NULL).',
    },
  ],
};

/* ---------------------------------------------------------------- ACERCA DE */

export const ACERCA = {
  paragraphs: [
    'La aplicación SQL Intermedio, permite aprender sobre Joins, Funciones agregadas ó de resumen y subconsultas.',
    'La aplicación se utiliza como estrategia para mejorar las habilidades en temas de SQL Intermedio donde algunos estudiantes del programa de Ingeniería de Sistemas de la Universidad Francisco de Paula Santander Ocaña (UFPSO) han tenido dificultades de aprendizaje.',
    'La aplicación provee una lista de once (11) ejercicios SQL con su respectiva solución y acceso a un repositorio dispuesto en la plataforma Github donde se aloja el código SQL.',
    'La aplicación se encuentra disponible para su uso de forma gratuita y además puede ser utilizada por cualquier persona que quiera aprender SQL Intermedio.',
  ],
  author: 'Byron Cuesta Quintero',
  authorRole: 'Docente del Departamento de Sistemas e Informática - Facultad de Ingeniería - UFPSO. Director del Grupo de Investigación en Pensamiento Computacional (GIPCO).',
  contact: 'byroncuesta@ufpso.edu.co',
  updated: 'Contenido actualizado el 7 de marzo de 2024.',
};
