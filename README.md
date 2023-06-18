# API de Gestión de Tareas

Esta es una API para gestionar tareas. Permite crear, obtener, actualizar y eliminar tareas, así como realizar búsquedas avanzadas. También incluye documentación de la API utilizando Swagger.

## Requisitos

- Node.js (v12 o superior)
- npm (administrador de paquetes de Node.js)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/iamsource2021/express-mysql-restapi.git

   ```

2. Ve al directorio del proyecto:

   ```bash
   cd express-mysql-restapi

   ```
3. Instala las dependencias:
   
   ```bash
   npm install

   ```
# Configuración

Antes de ejecutar la API, debes realizar la configuración necesaria. Asegúrate de tener una base de datos configurada y ajusta la configuración de Sequelize en el archivo config/database.js.

# Ejecución

Para ejecutar la API en modo de desarrollo, utiliza el siguiente comando:

   ```bash
   npm run dev

   ```

La API estará disponible en http://localhost:3000/api   

# Documentación de la API

Puedes acceder a la documentación de la API utilizando Swagger. Abre tu navegador y visita la siguiente URL:

   ```bash
   http://localhost:3000/

   ```
   
# Ejemplo de Reglas de negocio

Regla de negocio 1: Guardar una bitácora de todos los movimientos realizados

   ```bash
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

   ```

Regla de negocio 2: Crear una tarea y asignar como responsable a otro usuario

   ```bash
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
   ```

Regla de negocio 3: Modificar campos de una tarea compartida, excepto "Creado por"

   ```bash
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

   ```

Regla de negocio 4: Ver, editar, completar y eliminar tareas públicas

   ```bash
const obtenerTareasPublicas = async (req, res) => {
  try {
    const tareasPublicas = await TareaModel.findAll({ where: { esPublica: true } });
    res.json(tareasPublicas);
  } catch (error) {
    console.error('Error al obtener las tareas públicas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas públicas' });
  }
};
   ```

Regla de negocio 5: Búsqueda de tareas

   ```bash
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

   ```

# Licencia

Este proyecto está bajo la Licencia MIT.
