-- Tabla de Usuarios
CREATE TABLE Usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL
  -- Otros campos de información del usuario
);

-- Tabla de Tareas
CREATE TABLE Tareas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  estatus_complecion ENUM('Pendiente', 'En progreso', 'Completada') NOT NULL,
  fecha_entrega DATE NOT NULL,
  es_publica BOOLEAN NOT NULL,
  comentarios TEXT,
  creado_por INT NOT NULL,
  responsable INT,
  archivo VARCHAR(100),
  FOREIGN KEY (creado_por) REFERENCES Usuarios(id),
  FOREIGN KEY (responsable) REFERENCES Usuarios(id)
);

-- Tabla de Usuarios Compartidos
CREATE TABLE UsuariosCompartidos (
  tarea_id INT,
  usuario_id INT,
  FOREIGN KEY (tarea_id) REFERENCES Tareas(id),
  FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
  PRIMARY KEY (tarea_id, usuario_id)
);

-- Tabla de Bitácora
CREATE TABLE Bitacora (
  id INT PRIMARY KEY AUTO_INCREMENT,
  accion VARCHAR(100) NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tarea_id INT,
  FOREIGN KEY (tarea_id) REFERENCES Tareas(id)
);

-- Trigger para insertar en la tabla Bitacora cuando se crea una tarea
CREATE TRIGGER tarea_creada AFTER INSERT ON Tareas
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id)
  VALUES ('Tarea creada', NEW.id);
END;

-- Trigger para insertar en la tabla Bitacora cuando se actualiza una tarea
CREATE TRIGGER tarea_actualizada AFTER UPDATE ON Tareas
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id)
  VALUES ('Tarea actualizada', NEW.id);
END;

-- Trigger para insertar en la tabla Bitacora cuando se elimina una tarea
CREATE TRIGGER tarea_eliminada AFTER DELETE ON Tareas
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id)
  VALUES ('Tarea eliminada', OLD.id);
END;
