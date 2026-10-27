// Esquemas y datos de práctica, tomados de los scripts .sql del repositorio
// (1. Joins, 2. Aggregates, 3. Subquerys, 4. Exercises).
// Se cargan en una base de datos PostgreSQL que corre dentro del navegador (PGlite).
export const SEED_SQL = `
SET datestyle = 'ISO, DMY';

-- 1. Joins: BD escuela
CREATE SCHEMA escuela;

CREATE TABLE escuela.curso
(curso varchar(2),
nombre varchar(40),
constraint nn_nombre_curso check (nombre is not null),
constraint pk_curso primary key (curso)
);

CREATE TABLE escuela.estudiante
(codigo varchar(4),
nombre varchar(80),
genero char (1),
curso varchar(2),
constraint nn_nombre_estudiante check (nombre is not null),
constraint ck_genero_estudiante check (genero in ('M','F')),
constraint pk_estudiante  primary key (codigo)
);

insert into escuela.curso (curso, nombre)
values ('01', 'PRIMERO' ),
('02', 'SEGUNDO'),
('03', 'TERCERO'),
('04', 'CUARTO'),
('05', 'QUINTO');

insert into escuela.estudiante (codigo, nombre, genero, curso)
values ('1010', 'CLARA JAIME','F', '01'),
('1011', 'ADA ALVAREZ','F', '02'),
('1012', 'DANIEL REYES','M', '03'),
('1013', 'ELISA QUINTERO','F', '01'),
('1014', 'PATRICIA PINTO','F', NULL);

-- 2. Funciones agregadas: BD tienda
CREATE SCHEMA tienda;

CREATE TABLE tienda.producto(
   ref VARCHAR(2),
   pro VARCHAR(3),
   nombre VARCHAR(40),
   uni VARCHAR(10),
   precio INTEGER,
   CONSTRAINT ck_nom_producto CHECK (nombre IS NOT NULL),
   CONSTRAINT ck_uni_producto CHECK (uni IS NOT NULL),
   CONSTRAINT ck_precio_invalido CHECK (precio > 0),
   CONSTRAINT pk_producto PRIMARY KEY(ref, pro)
 );

insert into tienda.producto (ref, pro, nombre, uni, precio)
values ('P0', '001', 'MANGO', 'KILO', '2000'),
('P0', '002', 'PAPAYA', 'KILO', '5000'),
('P1', '003', 'HIGO', 'KILO', '5000'),
('P1', '004', 'LULO', 'KILO', '4800'),
('P0', '005', 'MANZANA', 'UNI', NULL);

-- 3. Subconsultas: BD empresa
CREATE SCHEMA empresa;

CREATE TABLE empresa.empleado(
   id_emp VARCHAR(5),
   nombre VARCHAR(50),
   salario INTEGER,
   id_jefe VARCHAR(5),
   CONSTRAINT ck_nom_empleado CHECK (nombre IS NOT NULL),
   CONSTRAINT ck_salario_invalido CHECK (salario > 0),
   CONSTRAINT fk_empleado_jefe FOREIGN KEY(id_jefe)
   REFERENCES empresa.empleado (id_emp),
   CONSTRAINT pk_empleado PRIMARY KEY(id_emp)
 );

insert into empresa.empleado (id_emp, nombre, salario, id_jefe)
values ('E0001', 'JUAN PEREZ', 2000, 'E0002'),
('E0002', 'MARY LOPEZ', 3000, 'E0003'),
('E0003', 'ANA SAENZ', 4000, NULL),
('E0004', 'LUIS ORTEGA', NULL, NULL),
('E0005', 'ANA GOMEZ', 3000, 'E0003');

-- 4. Ejercicios: BD supermarket
CREATE SCHEMA supermarket;

CREATE TABLE supermarket.cliente(
   id_c VARCHAR(5),
   nombre VARCHAR(50),
   sexo VARCHAR(1),
   CONSTRAINT ck_nom_cliente CHECK (nombre IS NOT NULL),
   CONSTRAINT ck_sexo_cliente CHECK (sexo IS NOT NULL),
   CONSTRAINT ck_sexo_valido CHECK (sexo IN ('M','F')),
   CONSTRAINT pk_cliente PRIMARY KEY(id_c)
 );

CREATE TABLE supermarket.producto(
   ref VARCHAR(2),
   pro VARCHAR(3),
   nombre VARCHAR(40),
   uni VARCHAR(10),
   precio INTEGER,
   CONSTRAINT ck_nom_producto CHECK (nombre IS NOT NULL),
   CONSTRAINT ck_uni_producto CHECK (uni IS NOT NULL),
   CONSTRAINT ck_precio_invalido CHECK (precio > 0),
   CONSTRAINT pk_producto PRIMARY KEY(ref, pro)
 );

CREATE TABLE supermarket.pedido(
   id_ped INTEGER,
   fecha DATE,
   id_c VARCHAR(5),
   total INTEGER,
   CONSTRAINT ck_fecha_pedido CHECK (fecha IS NOT NULL),
   CONSTRAINT fk_cliente_pedido FOREIGN KEY(id_c)
   REFERENCES supermarket.cliente (id_c),
   CONSTRAINT pk_pedido PRIMARY KEY(id_ped)
 );

CREATE TABLE supermarket.detalle_pedido(
   id_ped INTEGER,
   ord INTEGER,
   ref VARCHAR(2),
   id_pro VARCHAR(3),
   cant INTEGER,
   vlr_unit INTEGER,
   CONSTRAINT ck_cantidad_invalida CHECK (cant > 0),
   CONSTRAINT fk_pedido_det_ped FOREIGN KEY(id_ped)
   REFERENCES supermarket.pedido (id_ped),
   CONSTRAINT fk_producto_det_ped FOREIGN KEY(ref, id_pro)
   REFERENCES supermarket.producto (ref, pro),
   CONSTRAINT pk_detalle_pedido PRIMARY KEY(id_ped, ord)
 );

insert into supermarket.cliente (id_c, nombre, sexo)
values ('C0001', 'JUAN RIZO', 'M'),
('C0002', 'ANA LOPEZ', 'F'),
('C0003', 'MARIA ZEA', 'F'),
('C0004', 'LUIS GIL', 'M'),
('C0005', 'MARIA GOEZ', 'F');

insert into supermarket.producto (ref, pro, nombre, uni, precio)
values ('P0', '001', 'MANGO', 'KILO', '2000'),
('P0', '002', 'PAPAYA', 'KILO', '5000'),
('P1', '003', 'HIGO', 'KILO', '5000'),
('P1', '004', 'LULO', 'KILO', '4800'),
('P0', '005', 'MANZANA', 'UNI', NULL);

insert into supermarket.pedido (id_ped, fecha, id_c, total)
values (10449, '10/04/2022', 'C0002', 27800),
(10028, '15/01/2022', 'C0003', 14100),
(10325, '14/03/2022', NULL, NULL),
(11456, '25/02/2023', 'C0001', 4000),
(10888, '21/09/2022', 'C0004', 9600),
(11045, '08/01/2023', 'C0004', 40000),
(10732, '22/06/2022', 'C0002', 4700),
(11555, '27/04/2023', 'C0002', 5000);

insert into supermarket.detalle_pedido (id_ped, ord, ref, id_pro, cant, vlr_unit)
values (10449, 1, 'P0', '001', 5, 1800),
(10028, 1, 'P0', '002', 3, 4700),
(10449, 2, 'P0', '002', 4, 4700),
(11456, 1, 'P0', '001', 2, 2000),
(10888, 1, 'P1', '003', 2, 4800),
(11045, 1, 'P0', '002', 8, 5000),
(10732, 1, 'P0', '002', 1, 4700),
(11555, 1, 'P1', '003', 1, 5000);
`;

/** Tablas disponibles, para el editor libre. */
export const TABLES = [
  { schema: 'escuela', tables: ['estudiante', 'curso'] },
  { schema: 'tienda', tables: ['producto'] },
  { schema: 'empresa', tables: ['empleado'] },
  { schema: 'supermarket', tables: ['cliente', 'producto', 'pedido', 'detalle_pedido'] },
];
