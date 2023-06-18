-- Trigger para insertar en la tabla Bitacora cuando se crea una tarea
DELIMITER //
CREATE TRIGGER tarea_creada AFTER INSERT ON Tareas FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id) VALUES ('Tarea creada', NEW.id);
END //
DELIMITER ;

-- Trigger para insertar en la tabla Bitacora cuando se actualiza una tarea
DELIMITER //
CREATE TRIGGER tarea_actualizada AFTER UPDATE ON Tareas FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id) VALUES ('Tarea actualizada', NEW.id);
END //
DELIMITER ;

-- Trigger para insertar en la tabla Bitacora cuando se elimina una tarea
DELIMITER //
CREATE TRIGGER tarea_eliminada AFTER DELETE ON Tareas FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (accion, tarea_id) VALUES ('Tarea eliminada', OLD.id);
END //
DELIMITER ;
