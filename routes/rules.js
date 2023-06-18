const express = require('express');
const router = express.Router();
const tareaController = require('./../controllers/tareaController');

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints relacionados con las tareas
 */

/**
 * @swagger
 * /rules:
 *   post:
 *     summary: Crear una tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               responsable:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       500:
 *         description: Error al crear la tarea
 */
router.post('/', tareaController.crearTarea);

/**
 * @swagger
 * /rules/{tareaId}:
 *   put:
 *     summary: Editar una tarea compartida
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responsable:
 *                 type: string
 *               otrosCampos:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea editada exitosamente
 *       403:
 *         description: No tienes permiso para editar esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al editar la tarea
 */
router.put('/:tareaId', tareaController.editarTareaCompartida);

/**
 * @swagger
 * /rules/publicas:
 *   get:
 *     summary: Obtener todas las tareas públicas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Tareas públicas obtenidas exitosamente
 *       500:
 *         description: Error al obtener las tareas públicas
 */
router.get('/publicas', tareaController.obtenerTareasPublicas);

/**
 * @swagger
 * /rules/publicas/{tareaId}:
 *   put:
 *     summary: Editar una tarea pública
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea pública a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otrosCampos:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea pública editada exitosamente
 *       404:
 *         description: Tarea pública no encontrada
 *       500:
 *         description: Error al editar la tarea pública
 */
router.put('/publicas/:tareaId', tareaController.editarTareaPublica);

/**
 * @swagger
 * /rules/publicas/{tareaId}/completar:
 *   put:
 *     summary: Completar una tarea pública
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea pública a completar
 *     responses:
 *       200:
 *         description: Tarea pública completada exitosamente
 *       404:
 *         description: Tarea pública no encontrada
 *       500:
 *         description: Error al completar la tarea pública
 */
router.put('/publicas/:tareaId/completar', tareaController.completarTareaPublica);

/**
 * @swagger
 * /rules/publicas/{tareaId}:
 *   delete:
 *     summary: Eliminar una tarea pública
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea pública a eliminar
 *     responses:
 *       200:
 *         description: Tarea pública eliminada exitosamente
 *       404:
 *         description: Tarea pública no encontrada
 *       500:
 *         description: Error al eliminar la tarea pública
 */
router.delete('/publicas/:tareaId', tareaController.eliminarTareaPublica);

/**
 * @swagger
 * /rules/buscar:
 *   get:
 *     summary: Buscar tareas
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Palabra clave para buscar en el título de las tareas
 *       - in: query
 *         name: completada
 *         schema:
 *           type: string
 *         enum: [true, false]
 *         description: Filtrar por estado de compleción de la tarea
 *       - in: query
 *         name: esPublica
 *         schema:
 *           type: string
 *         enum: [true, false]
 *         description: Filtrar por tareas públicas o privadas
 *       - in: query
 *         name: usuariosCompartidos
 *         schema:
 *           type: string
 *         description: Filtrar por cantidad de usuarios con los que se ha compartido la tarea
 *       - in: query
 *         name: diasRestantes
 *         schema:
 *           type: string
 *         description: Filtrar por cantidad de días restantes para el vencimiento de la tarea
 *       - in: query
 *         name: formatoArchivo
 *         schema:
 *           type: string
 *         description: Filtrar por formato de archivo adjunto en la tarea
 *     responses:
 *       200:
 *         description: Tareas encontradas exitosamente
 *       500:
 *         description: Error al buscar las tareas
 */
router.get('/buscar', tareaController.buscarTareas);

module.exports = router;