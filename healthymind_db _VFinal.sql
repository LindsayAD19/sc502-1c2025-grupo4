-- Database
CREATE DATABASE IF NOT EXISTS HEALTHYMIND_DB;
USE HEALTHYMIND_DB;

-- Tabla: usuarios_tb
CREATE TABLE usuarios_tb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('paciente','terapeuta','admin') NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  direccion TEXT,
  contrasena VARCHAR(255) NOT NULL,
  foto_perfil VARCHAR(255) DEFAULT 'default.png',
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: cita
CREATE TABLE cita (
  ID_CITA INT AUTO_INCREMENT PRIMARY KEY,
  FECHA DATE,
  HORA TIME,
  ID_PACIENTE INT,
  ID_TERAPEUTA INT,
  FOREIGN KEY (ID_PACIENTE) REFERENCES usuarios_tb(id),
  FOREIGN KEY (ID_TERAPEUTA) REFERENCES usuarios_tb(id)
);

-- Tabla: contacto
CREATE TABLE contacto (
  ID_CONTACTO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(200) NOT NULL,
  APELLIDO VARCHAR(200) NOT NULL,
  SEXO ENUM('masculino','femenino') NOT NULL,
  MENSAJE TEXT NOT NULL,
  CORREO VARCHAR(600) NOT NULL,
  ID_USUARIO INT NOT NULL,
  FOREIGN KEY (ID_USUARIO) REFERENCES usuarios_tb(id)
);

-- Tabla: terapia
CREATE TABLE terapia (
  ID_TERAPIA INT AUTO_INCREMENT PRIMARY KEY,
  ESPECIALIDAD VARCHAR(80) NOT NULL,
  DESCRIPCION VARCHAR(100) NOT NULL
);

-- Tabla: pago
CREATE TABLE pago (
  ID_PAGO INT AUTO_INCREMENT PRIMARY KEY,
  FECHA_PAGO TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  METODO_PAGO VARCHAR(20) NOT NULL,
  ID_CITA INT,
  ID_TERAPIA INT NOT NULL,
  TOTAL FLOAT,
  FOREIGN KEY (ID_CITA) REFERENCES cita(ID_CITA),
  FOREIGN KEY (ID_TERAPIA) REFERENCES terapia(ID_TERAPIA)
);

-- Tabla: recurso
CREATE TABLE recurso (
  ID_RECURSO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(200),
  FECHA DATE,
  IMAGEN VARCHAR(255),
  LINK VARCHAR(255)
);

-- Tabla: sesion
CREATE TABLE sesion (
  ID_SESION INT AUTO_INCREMENT PRIMARY KEY,
  PLATAFORMA VARCHAR(200) NOT NULL,
  ID_CITA INT,
  FOREIGN KEY (ID_CITA) REFERENCES cita(ID_CITA)
);

-- Tabla: terapeuta_horario
CREATE TABLE terapeuta_horario (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ID_TERAPEUTA INT NOT NULL,
  DIA ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  HORA_INICIO TIME NOT NULL,
  HORA_FIN TIME NOT NULL,
  FOREIGN KEY (ID_TERAPEUTA) REFERENCES usuarios_tb(id)
);

-- Tabla: terapeuta_terapia
CREATE TABLE terapeuta_terapia (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ID_TERAPEUTA INT NOT NULL,
  ID_TERAPIA INT NOT NULL,
  PRECIO DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (ID_TERAPEUTA) REFERENCES usuarios_tb(id),
  FOREIGN KEY (ID_TERAPIA) REFERENCES terapia(ID_TERAPIA)
);


INSERT INTO RECURSO (ID_RECURSO, NOMBRE, FECHA, IMAGEN, LINK)
VALUES (1, 'Guía de autocuidado','2025-03-05','public/img/guia_autocuidado.png','https://psiconecta.org/blog/guia-de-autocuidado'),
(2, 'Cuaderno de talleres psicoterapéuticos para la reconstrucción emocional','2025-03-05','public/img/reconstruccion_emocional.jpg','https://psiconecta.org/blog/cuaderno-de-talleres-psicoterapeuticos-para-la-reconstruccion-emocional?c=material-para-profesionales'),
(3, 'Guía de Prevención del Suicidio: Protocolo de Actuación en conductas autolíticas','2025-03-05','public/img/prevencion_suicidio.png','https://psiconecta.org/blog/guia-de-prevencion-del-suicidio-protocolo-de-actuacion-en-conductas-autoliticas'),
(4, 'Plan de seguridad de Stanley-Brown','2025-03-05','public/img/stanley_brown.jpg','https://psiconecta.org/blog/plan-de-seguridad-de-stanley-brown?c=material-para-profesionales');

INSERT INTO usuarios_tb (TIPO, NOMBRE, APELLIDOS, EMAIL, TELEFONO, DIRECCION, CONTRASENA, FOTO_PERFIL, CREADO_EN) VALUES
('paciente', 'Francynne', 'Alfaro', 'ahienalfaro@gmail.com', '85858585', 'Coro', '$2y$10$RkHxrL3iGkAt7eveyEIgYOJiU.2IcxLlfjHf60eJPn8oRrkEu.FsK', 'default.png', '2025-04-24 00:38:14'),
('terapeuta', 'Luisa', 'Fernandez', 'lin@gmail.com', '88889999', 'Heredia', '$2y$10$FEahu6iGUz/AyhK9Chd2Leubp3h8EMWa2x.ykQI5fdFi2ABk2BiWi', 'default.png', '2025-04-24 00:44:31'),
('admin', 'Admin', 'NA', 'admin@gmail.com', 'NA', 'NA', '$2y$10$jjwzoPSTOYITvL4edHOQPerHJvxaikfTvmkM9.dfc.d9h9Z0lczVi', 'default.png', '2025-04-24 00:48:29'),
('terapeuta', 'Stefan', 'Camacho', 'stefan.camacho@ejemplo.com', '88881111', 'San José, Costa Rica', 'camacho123', 'default.png', '2025-04-23 06:00:00'),
('terapeuta', 'Camila', 'López', 'camila.lopez@ejemplo.com', '88882222', 'Heredia, Costa Rica', 'lopez123', 'default.png', '2025-04-23 06:00:00'),
('terapeuta', 'Valeria', 'Ramírez', 'valeria.ramirez@ejemplo.com', '88883333', 'Cartago, Costa Rica', 'ramirez123', 'default.png', '2025-04-23 06:00:00'),
('terapeuta', 'Hunter', 'Morales', 'hunter.morales@ejemplo.com', '88884444', 'Alajuela, Costa Rica', 'morales123', 'default.png', '2025-04-23 06:00:00'),
('terapeuta', 'Alejandro', 'Rojas', 'alejandro.rojas@ejemplo.com', '88885555', 'Puntarenas, Costa Rica', 'rojas123', 'default.png', '2025-04-23 06:00:00'),
('terapeuta', 'Naomi', 'Gutiérrez', 'naomi.gutierrez@ejemplo.com', '88886666', 'Limón, Costa Rica', 'gutierrez123', 'default.png', '2025-04-23 06:00:00');

INSERT INTO TERAPEUTA_HORARIO (ID_TERAPEUTA, DIA, HORA_INICIO, HORA_FIN) VALUES
(2, 'Martes', '08:00:00', '11:00:00'),
(4, 'Lunes', '08:00:00', '12:00:00'),
(5, 'Miércoles', '14:00:00', '18:00:00'),
(6, 'Martes', '09:00:00', '13:00:00'),
(7, 'Jueves', '15:00:00', '19:00:00'),
(8, 'Lunes', '10:00:00', '14:00:00'),
(9, 'Jueves', '10:00:00', '14:00:00'),
(9, 'Viernes', '10:00:00', '14:00:00');

INSERT INTO TERAPIA (ESPECIALIDAD, DESCRIPCION) VALUES
('Terapia Cognitivo Conductual', 'Enfocada en cambiar patrones de pensamiento negativos.'),
('Terapia Familiar', 'Ayuda a resolver conflictos dentro del núcleo familiar.'),
('Terapia cognitivo-conductual', 'Ayuda a modificar pensamientos y comportamientos negativos mediante técnicas estructuradas para trat'),
('Terapia para la ansiedad y el estrés', 'Brinda herramientas psicológicas para identificar y reducir los síntomas de ansiedad y estrés, promo'),
('Terapia familiar y de pareja', 'Facilita la comunicación y resolución de conflictos en relaciones familiares y de pareja, fortalecie'),
('Terapia de aceptación', 'Utiliza técnicas de aceptación y compromiso para ayudar a las personas a enfrentar pensamientos difí'),
('Psiquiatría – Trastornos del estado de ánimo y esquizofrenia', 'Diagnostica y trata afecciones psiquiátricas complejas mediante terapia y medicación, enfocándose en'),
('Psicología – Autoconocimiento y resiliencia emocional', 'Acompaña procesos de crecimiento personal, fortaleciendo la autoestima y la capacidad de afrontar si');

INSERT INTO TERAPEUTA_TERAPIA (ID_TERAPEUTA, ID_TERAPIA, PRECIO) VALUES
(2, 5, 13500.00),
(4, 4, 9000.00),
(5, 1, 14000.00),
(6, 2, 10000.00),
(7, 3, 12000.00),
(8, 4, 15000.00),
(9, 5, 18000.00);