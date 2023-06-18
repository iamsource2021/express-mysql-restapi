const TareaModel = require('./../models/index')['Tarea'];
const BitacoraModel = require('./../models/index')['Bitacora'];

// Regla de negocio 1: Guardar una bitácora de todos los movimientos realizados
const guardarBitacora = async (accion, tareaId, usuarioId) => {
  try {
    const bitacora = await BitacoraModel.create({
      accion,
      tareaId,
      usuarioId,
    });
    console.log('Bitácora guardada:', bitacora);
  } catch (error) {
    console.error('Error al guardar la bitácora:', error);
  }
};

// Regla de negocio 2: Crear una tarea y asignar como responsable a otro usuario
const crearTarea = async (req, res) => {
  const { titulo, descripcion, responsable } = req.body;

  try {
    const tarea = await TareaModel.create({
      titulo,
      descripcion,
      responsable,
    });

    guardarBitacora('Tarea creada', tarea.id, req.userId);

    res.status(201).json(tarea);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Regla de negocio 3: Modificar campos de una tarea compartida, excepto "Creado por"
const editarTareaCompartida = async (req, res) => {
  const { tareaId } = req.params;
  const { responsable, ...actualizacion } = req.body;

  try {
    const tarea = await TareaModel.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (tarea.creadoPor === req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar esta tarea' });
    }

    await tarea.update(actualizacion);

    guardarBitacora('Tarea modificada', tarea.id, req.userId);

    res.json(tarea);
  } catch (error) {
    console.error('Error al editar la tarea:', error);
    res.status(500).json({ error: 'Error al editar la tarea' });
  }
};

// Regla de negocio 4: Ver, editar, completar y eliminar tareas públicas
const obtenerTareasPublicas = async (req, res) => {
  try {
    const tareasPublicas = await TareaModel.findAll({ where: { esPublica: true } });
    res.json(tareasPublicas);
  } catch (error) {
    console.error('Error al obtener las tareas públicas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas públicas' });
  }
};

const editarTareaPublica = async (req, res) => {
  const { tareaId } = req.params;
  const actualizacion = req.body;

  try {
    const tarea = await TareaModel.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.update(actualizacion);

    guardarBitacora('Tarea pública modificada', tarea.id, req.userId);

    res.json(tarea);
  } catch (error) {
    console.error('Error al editar la tarea pública:', error);
    res.status(500).json({ error: 'Error al editar la tarea pública' });
  }
};

const completarTareaPublica = async (req, res) => {
  const { tareaId } = req.params;

  try {
    const tarea = await TareaModel.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.completada = true;
    await tarea.save();

    guardarBitacora('Tarea pública completada', tarea.id, req.userId);

    res.json(tarea);
  } catch (error) {
    console.error('Error al completar la tarea pública:', error);
    res.status(500).json({ error: 'Error al completar la tarea pública' });
  }
};

const eliminarTareaPublica = async (req, res) => {
  const { tareaId } = req.params;

  try {
    const tarea = await TareaModel.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.destroy();

    guardarBitacora('Tarea pública eliminada', tarea.id, req.userId);

    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea pública:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea pública' });
  }
};

// Regla de negocio 6: Búsqueda de tareas
const buscarTareas = async (req, res) => {
  const { keyword, completada, esPublica, usuariosCompartidos, diasRestantes, formatoArchivo } = req.query;

  const where = {};

  if (keyword) {
    where.titulo = { [Op.like]: `%${keyword}%` };
  }

  if (completada) {
    where.completada = completada === 'true';
  }

  if (esPublica) {
    where.esPublica = esPublica === 'true';
  }

  if (usuariosCompartidos) {
    where.usuariosCompartidos = usuariosCompartidos;
  }

  if (diasRestantes) {
    where.diasRestantes = { [Op.lte]: diasRestantes };
  }

  if (formatoArchivo) {
    where.formatoArchivo = formatoArchivo;
  }

  try {
    const tareas = await TareaModel.findAll({ where });
    res.json(tareas);
  } catch (error) {
    console.error('Error al buscar las tareas:', error);
    res.status(500).json({ error: 'Error al buscar las tareas' });
  }
};

module.exports = {
  crearTarea,
  editarTareaCompartida,
  obtenerTareasPublicas,
  editarTareaPublica,
  completarTareaPublica,
  eliminarTareaPublica,
  buscarTareas,
};