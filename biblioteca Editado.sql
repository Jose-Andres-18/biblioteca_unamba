-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2021 a las 13:46:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `biblioteca_edit`

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `configuracion`
CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` text NOT NULL,
  `correo` varchar(100) NOT NULL,
  `foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `configuracion`
INSERT INTO `configuracion` (`id`, `nombre`, `telefono`, `direccion`, `correo`, `foto`) VALUES
(1, 'Biblioteca UNAMBA', '987353766', 'Av. Garcilazo de la Vega S/N, Tamburco', 'biblioteca@unamba.edu.pe', 'logo.png');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `permisos`
CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `permisos`
INSERT INTO `permisos` (`id`, `nombre`, `tipo`) VALUES
(1, 'Libros', 1),
(2, 'Autor', 2),
(3, 'Editorial', 3),
(4, 'Usuarios', 4),
(5, 'Configuracion', 5),
(6, 'Estudiantes', 6),
(7, 'Materias', 7),
(8, 'Reportes', 8),
(9, 'Prestamos', 9);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `clave`, `estado`) VALUES
(1, 'admin', 'Administrador', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1),
(2, 'angel', 'Vida Informatico', '519ba91a5a5b4afb9dc66f8805ce8c442b6576316c19c6896af2fa9bda6aff71', 0),
(3, 'Andres', 'Andres', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1),
(4, 'LUZ', 'LUZ', 'a7a62a77bd7dd66009d0d3b763343f600ac1cf7d51b6b19204ee70904fb03ca2', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `detalle_permisos`
CREATE TABLE `detalle_permisos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `detalle_permisos`
INSERT INTO `detalle_permisos` (`id`, `id_usuario`, `id_permiso`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 3),
(4, 2, 5),
(5, 2, 8);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `autor`
CREATE TABLE `autor` (
  `id` int(11) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `autor`
INSERT INTO `autor` (`id`, `autor`, `imagen`, `estado`) VALUES
(1, 'Dolly Alderton', '20250106150655.jpg', 1),
(2, 'Lorena Alvarez', '20250106150718.jpg', 1),
(3, 'Gabriel Amaro Alzamora', '20250106150755.jpg', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `editorial`
CREATE TABLE `editorial` (
  `id` int(11) NOT NULL,
  `editorial` varchar(150) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `editorial`
INSERT INTO `editorial` (`id`, `editorial`, `estado`) VALUES
(1, 'Aquari', 1),
(2, 'Austral', 0),
(3, 'Ariel', 1),
(4, 'Booket', 1),
(5, 'Crossbooks', 1),
(6, 'Click Ediciones', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `materia`
CREATE TABLE `materia` (
  `id` int(11) NOT NULL,
  `materia` text NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `materia`
INSERT INTO `materia` (`id`, `materia`, `estado`) VALUES
(1, 'Base de Datos', 1),
(2, 'Ingenieria de Software', 1),
(3, 'Algebra', 1),
(4, 'Matematica', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `libro`
CREATE TABLE `libro` (
  `id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_autor` int(11) NOT NULL,
  `id_editorial` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `anio_edicion` date NOT NULL,
  `num_pagina` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `libro`
INSERT INTO `libro` (`id`, `titulo`, `cantidad`, `id_autor`, `id_editorial`,
 `id_materia`, `anio_edicion`, `num_pagina`, `descripcion`, `imagen`, `isbn`, `estado`) VALUES
(1, 'libro1', 8, 1, 1, 1, '2021-05-08', 1335, 'Este es un ejemplo de un libro1', 'logo.png',  '978-3-16-148410-0', 1),
(2, 'libro2', 7, 2, 2, 2, '2012-02-23', 1478, 'Este es un ejemplo de un libro2', 'logo.png', '978-0-307-29136-3', 0),
(3, 'libro3', 5, 3, 2, 3, '2002-08-04', 258, 'Este es un ejemplo de un libro3', 'logo.png', '978-1-86197-876-9', 1),
(4, 'Javascript', 10, 3, 1, 2, '2016-12-23', 569, 'JavaScript: es una guia completa para programadores y un manual de referencia para JavaScript. Es particularmente util para desarrolladores que trabajan con los navegadores web compatibles con los estandares mas recientes, como Internet Explorer 6, Netscape 6 y Mozilla.', 'logo.png', '978-0-7432-7356-5', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `carrera`
CREATE TABLE `carrera` (
  `id` int(11) NOT NULL,
  `carrera` varchar(150) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `carrera`
INSERT INTO `carrera` (`id`, `carrera`, `imagen`, `estado`) VALUES
(1, 'Administracion', 'logo.png', 1),
(2, 'Ingenieria Informatica y Sistemas', 'logo.png', 1),
(3, 'Ciencias Politicas y Gobernabilidad', 'logo.png', 1),
(4, 'Educacion Inicial Intercultural Bilingue Primera y Segunda Infancia', 'logo.png', 1),
(5, 'Ingenieria Agroindustrial', 'logo.png', 1),
(6, 'Ingenieria Civil', 'logo.png', 1),
(7, 'Ingenieria de Minas', 'logo.png', 1);

-- ------------------------------------------------------
-- Estructura de tabla para la tabla `detalle_libro_carrera`
CREATE TABLE `detalle_libro_carrera` (
  `id` INT(11) NOT NULL,
  `id_libro` INT(11) NOT NULL,
  `id_carrera` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `detalle_libro_carrera`
INSERT INTO `detalle_libro_carrera` (`id`, `id_carrera`, `id_libro`) VALUES
(1, 2, 4),
(2, 2, 1),
(3, 1, 3);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `estudiante`
CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL,
  `codigo` varchar(6) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido_pa` VARCHAR(150) NOT NULL,
  `apellido_ma` VARCHAR(150) NOT NULL,
  `genero` boolean NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `direccion` text,
  `telefono` varchar(9) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `estudiante`
INSERT INTO `estudiante` (`id`, `codigo`, `dni`, `nombre`, `apellido_pa`, `apellido_ma`,
 `genero`, `id_carrera`, `direccion`, `telefono`, `estado`) VALUES
(1, '211132', '12345678', 'Angel', 'Garcia', 'Perez', 1, 3, 'Tamburco', '987654321', 1),
(2, '201211', '87654321', 'Jose', 'Altamirano', 'Gonzales', 1, 1, 'Av. Sol', '900123123', 0),
(3, '242212', '73754863', 'Mariela Briyit', 'Salmuera', 'Zarit', 0, 2, 'Urb. Juan Pablo II', '900414445', 1);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `prestamo`
CREATE TABLE `prestamo` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_prestamo` date NOT NULL,
  `fecha_devolucion` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `observacion` text,
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcado de datos para la tabla `prestamo`
INSERT INTO `prestamo` (`id`, `id_estudiante`, `id_libro`, `id_usuario`, `fecha_prestamo`, `fecha_devolucion`, `cantidad`, `observacion`, `estado`) VALUES
(1, 1, 1, 1, '2021-05-11', '2021-05-11', 5, '', 0),
(2, 1, 2, 3, '2021-05-11', '2021-05-11', 15, '', 0);

-- ------------------------------------------------------------------------------------------------------------------
-- Índices para tablas volcadas
--
-- Indices de la tabla `configuracion`
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `permisos`
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `usuarios`
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `detalle_permisos`
ALTER TABLE `detalle_permisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_permiso` (`id_permiso`);

-- Indices de la tabla `autor`
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id`);
  
-- Indices de la tabla `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `materia`
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `libro`
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_autor` (`id_autor`),
  ADD KEY `id_editorial` (`id_editorial`),
  ADD KEY `id_materia` (`id_materia`);

-- Indices de la tabla `carrera`
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `detalle_libro_carrera`
ALTER TABLE `detalle_libro_carrera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_libro` (`id_libro`),
  ADD KEY `id_carrera` (`id_carrera`);

-- Indices de la tabla `estudiante`
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_carrera` (`id_carrera`);

-- Indices de la tabla `prestamo`
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estudiante` (`id_estudiante`),
  ADD KEY `id_libro` (`id_libro`),
  ADD KEY `id_usuario` (`id_usuario`);

-- ------------------------------------------------------------------------------------------------------------------
-- AUTO_INCREMENT de las tablas volcadas
--
-- AUTO_INCREMENT de la tabla `configuracion`
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- AUTO_INCREMENT de la tabla `permisos`
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

-- AUTO_INCREMENT de la tabla `usuarios`
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- AUTO_INCREMENT de la tabla `detalle_permisos`
ALTER TABLE `detalle_permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT de la tabla `autor`
ALTER TABLE `autor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla `editorial`
ALTER TABLE `editorial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- AUTO_INCREMENT de la tabla `materia`
ALTER TABLE `materia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- AUTO_INCREMENT de la tabla `libro`
ALTER TABLE `libro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- AUTO_INCREMENT de la tabla `carrera`
ALTER TABLE `carrera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

-- AUTO_INCREMENT de la tabla `detalle_libro_carrera`
ALTER TABLE `detalle_libro_carrera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla `estudiante`
ALTER TABLE `estudiante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla `prestamo`
ALTER TABLE `prestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

-- ------------------------------------------------------------------------------------------------------------------
-- Restricciones para tablas volcadas
--
-- Filtros para la tabla `detalle_permisos`
ALTER TABLE `detalle_permisos`
  ADD CONSTRAINT `detalle_permisos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `detalle_permisos_ibfk_2` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id`);

-- Filtros para la tabla `libro`
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autor` (`id`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`id_editorial`) REFERENCES `editorial` (`id`),
  ADD CONSTRAINT `libro_ibfk_3` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`);

-- Filtros para la tabla `detalle_libro_carrera`
ALTER TABLE `detalle_libro_carrera`
  ADD CONSTRAINT `detalle_libro_carrera_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id`),
  ADD CONSTRAINT `detalle_libro_carrera_ibfk_2` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id`);

-- Filtros para la tabla `estudiante`
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id`);

-- Filtros para la tabla `prestamo`
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`),
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id`),
  ADD CONSTRAINT `prestamo_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



(7, 'Javascript', 10, 1, 1, 2, '2016-12-23', 569, 'JavaScript: es una guia completa para programadores y un manual de referencia para JavaScript. Es particularmente util para desarrolladores que trabajan con los navegadores web compatibles con los estandares mas recientes, como Internet Explorer 6, Netscape 6 y Mozilla.', 'logo.png', '9780743273565', 1),
INSERT INTO `libro` (`id`, `titulo`, `cantidad`, `id_autor`, `id_editorial`, 
`id_materia`, `anio_edicion`, `num_pagina`, `descripcion`, `imagen`, `isbn`, `estado`) VALUES
(8, 'Python Avanzado', 12, 2, 3, 3, '2019-03-12', 890, 'Un libro avanzado para aprender Python, cubriendo temas desde estructuras de datos hasta inteligencia artificial.', 'logo.png', '9780123740597', 1),
(9, 'Programación Web', 6, 2, 2, 2, '2018-07-01', 1012, 'Una guía completa sobre el desarrollo web, cubriendo desde HTML, CSS hasta JavaScript y servidores web.', 'logo.png', '9781491921107', 0),
(10, 'Redes de Computadoras', 15, 1, 1, 2, '2015-11-15', 1154, 'Este libro profundiza en las redes de computadoras, incluyendo protocolos, arquitectura y seguridad en la red.', 'logo.png', '9780132921501', 1);

(11, 'Bases de Datos', 9, 3, 3, 2, '2020-06-18', 763, 'Una guía detallada sobre bases de datos relacionales y no relacionales, SQL, y el diseño de bases de datos.', 'databases.png', '9781303030624', 1),
(12, 'Inteligencia Artificial', 3, 2, 3, 7, '2022-10-09', 1324, 'Explora los fundamentos y aplicaciones de la inteligencia artificial, incluyendo aprendizaje automático y redes neuronales.', 'ai.png', '9780262033842', 0),
(13, 'Algoritmos y Estructuras de Datos', 11, 1, 1, 2, '2017-08-25', 980, 'Una introducción a los algoritmos y estructuras de datos fundamentales, adecuados tanto para novatos como para expertos.', 'algorithms.png', '9780387098012', 1);

