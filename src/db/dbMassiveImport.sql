--
-- File generated with SQLiteStudio v3.3.2 on ju. sep. 23 01:34:18 2021
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: categorias
INSERT INTO categorias (id, nombre) VALUES (1, 'bar');
INSERT INTO categorias (id, nombre) VALUES (2, 'restaurante');
-- Table: comensales
INSERT INTO comensales (id, correo, nombre, fotoUrl, telefono) VALUES (1, '1', 'dfsdf', 'xacf', '111');

-- Table: estados
INSERT INTO estados (id, nombre) VALUES (1, 'diponible');

-- Table: locales
INSERT INTO locales (id, nombre, direccion, categoriaId) VALUES (1, 'Pedro', 'french 414', 1);

-- Table: mesas
INSERT INTO mesas (id, numero, disponible, capacidad, piso, fila_mesa, columna_mesa, localeId) VALUES (1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO mesas (id, numero, disponible, capacidad, piso, fila_mesa, columna_mesa, localeId) VALUES (2, 2, 1, 2, 1, 1, 2, 1);
INSERT INTO mesas (id, numero, disponible, capacidad, piso, fila_mesa, columna_mesa, localeId) VALUES (3, 3, 1, 4, 1, 1, 3, 1);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
