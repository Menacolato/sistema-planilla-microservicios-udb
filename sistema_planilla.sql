-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2026 a las 18:44:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_planilla`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descuento`
--

CREATE TABLE `descuento` (
  `porcentaje` double NOT NULL,
  `vigencia` date NOT NULL,
  `id_descuento` bigint(20) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `salario_base_vigente` double NOT NULL,
  `id_empleado` bigint(20) NOT NULL,
  `identificacion` varchar(25) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`salario_base_vigente`, `id_empleado`, `identificacion`, `tipo`, `apellido`, `nombre`, `direccion`) VALUES
(700, 1, '01234567-8', 'PLAZA_FIJA', 'Pérez', 'Juan Carlos', 'Santa Tecla, El Salvador'),
(506, 2, '12345678-9', 'SERVICIOS_PROFESIONALES', 'García', 'Nicole ', ''),
(404, 3, '56565656-5', 'PLAZA_FIJA', 'Figueroa', 'Gaby', 'san salvador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_clase`
--

CREATE TABLE `horas_clase` (
  `horas_trabajadas` double NOT NULL,
  `id_empleado` bigint(20) NOT NULL,
  `id_horas` bigint(20) NOT NULL,
  `periodo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planilla`
--

CREATE TABLE `planilla` (
  `fecha_generacion` date NOT NULL,
  `salario_bruto` double NOT NULL,
  `salario_neto` double NOT NULL,
  `id_empleado` bigint(20) NOT NULL,
  `id_planilla` bigint(20) NOT NULL,
  `periodo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `planilla`
--

INSERT INTO `planilla` (`fecha_generacion`, `salario_bruto`, `salario_neto`, `id_empleado`, `id_planilla`, `periodo`) VALUES
('2026-05-16', 600, 514.18, 1, 1, 'MAYO-2026'),
('2026-05-16', 600, 514.18, 1, 2, 'MAYO-2026'),
('2026-05-17', 600, 538.5, 1, 3, 'MAYO-2026'),
('2026-05-17', 700, 628.25, 1, 4, 'JUNIO-2026'),
('2026-05-19', 500, 448.75, 2, 5, 'Junio 2026'),
('2026-05-19', 404, 362.59000000000003, 3, 6, 'Mayo 2026');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planilla_descuento`
--

CREATE TABLE `planilla_descuento` (
  `monto_descuento` double NOT NULL,
  `id_descuento` bigint(20) NOT NULL,
  `id_planilla` bigint(20) NOT NULL,
  `id_planilla_descuento` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` bigint(20) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'ROLE_ADMIN', 'Administrador del sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salario_base`
--

CREATE TABLE `salario_base` (
  `fecha_vigencia` date NOT NULL,
  `salario` double NOT NULL,
  `id_empleado` bigint(20) NOT NULL,
  `id_salario_base` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_empleado` bigint(20) DEFAULT NULL,
  `id_rol` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_empleado`, `id_rol`, `id_usuario`, `usuario`, `contrasena`) VALUES
(NULL, 1, 1, 'admin', '$2a$10$1WxGXlWFZdIFRkEKRJbk3.ThSQi37PpYvGeCIrI1jgd5/.OLB5LF2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `descuento`
--
ALTER TABLE `descuento`
  ADD PRIMARY KEY (`id_descuento`),
  ADD UNIQUE KEY `UK_n2c5jl7vxvd8tqgm2mlb79dci` (`tipo`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `UK_jqr2pmmt8brdy1gq69uc71vqr` (`identificacion`);

--
-- Indices de la tabla `horas_clase`
--
ALTER TABLE `horas_clase`
  ADD PRIMARY KEY (`id_horas`),
  ADD KEY `FK9i512npqtjfe8jjklf8g3ojk5` (`id_empleado`);

--
-- Indices de la tabla `planilla`
--
ALTER TABLE `planilla`
  ADD PRIMARY KEY (`id_planilla`),
  ADD KEY `FKe9ydlt54pr6h41mqwt0u8h9hh` (`id_empleado`);

--
-- Indices de la tabla `planilla_descuento`
--
ALTER TABLE `planilla_descuento`
  ADD PRIMARY KEY (`id_planilla_descuento`),
  ADD KEY `FKbxwiwk2rhin6f8j45p3m25v3l` (`id_descuento`),
  ADD KEY `FKkekdfq302v646gmx90jayhc1h` (`id_planilla`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `UK_l0qdsam7tunbtmxcmeeyfcifk` (`nombre_rol`);

--
-- Indices de la tabla `salario_base`
--
ALTER TABLE `salario_base`
  ADD PRIMARY KEY (`id_salario_base`),
  ADD KEY `FKf8nisb8mpyp32m82u97gn26d` (`id_empleado`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UK_i02kr8ui5pqddyd7pkm3v4jbt` (`usuario`),
  ADD UNIQUE KEY `UK_9na7lny3owcia98799gx6c2af` (`id_empleado`),
  ADD KEY `FKmyv3138vvci6kaq3y5kt4cntu` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `descuento`
--
ALTER TABLE `descuento`
  MODIFY `id_descuento` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horas_clase`
--
ALTER TABLE `horas_clase`
  MODIFY `id_horas` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planilla`
--
ALTER TABLE `planilla`
  MODIFY `id_planilla` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `planilla_descuento`
--
ALTER TABLE `planilla_descuento`
  MODIFY `id_planilla_descuento` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `salario_base`
--
ALTER TABLE `salario_base`
  MODIFY `id_salario_base` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `horas_clase`
--
ALTER TABLE `horas_clase`
  ADD CONSTRAINT `FK9i512npqtjfe8jjklf8g3ojk5` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Filtros para la tabla `planilla`
--
ALTER TABLE `planilla`
  ADD CONSTRAINT `FKe9ydlt54pr6h41mqwt0u8h9hh` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Filtros para la tabla `planilla_descuento`
--
ALTER TABLE `planilla_descuento`
  ADD CONSTRAINT `FKbxwiwk2rhin6f8j45p3m25v3l` FOREIGN KEY (`id_descuento`) REFERENCES `descuento` (`id_descuento`),
  ADD CONSTRAINT `FKkekdfq302v646gmx90jayhc1h` FOREIGN KEY (`id_planilla`) REFERENCES `planilla` (`id_planilla`);

--
-- Filtros para la tabla `salario_base`
--
ALTER TABLE `salario_base`
  ADD CONSTRAINT `FKf8nisb8mpyp32m82u97gn26d` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK8cp9xlcvihvrsry0pj7wrawfc` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`),
  ADD CONSTRAINT `FKmyv3138vvci6kaq3y5kt4cntu` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
