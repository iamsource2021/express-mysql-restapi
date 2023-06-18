const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const  TareaModel  = require('./../models/index')['Tarea'];

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */
router.get('/', async (req, res) => {
    try {
        const tareas = await TareaModel.findAll()
        res.json(tareas);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

/**
 * @swagger
 * /tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la tarea
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       '404':
 *         description: Tarea no encontrada
 */
router.get('/:id', async (req, res) => {
    const tareaId = req.params.id;
    try {
        const tareas = await TareaModel.findByPk(tareaId);
        if (tarea) {
            res.json(tarea);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
});

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       '201':
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 */
router.post('/', async (req, res) => {
    const nuevaTarea = req.body;
    try {  
        const tareas = await TareaModel.create(nuevaTarea);
        res.status(201).json(tareas);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       '200':
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       '404':
 *         description: Tarea no encontrada
 */
router.put('/:id', async (req, res) => {
    const tareaId = req.params.id;
    const tareaActualizada = req.body;
    try {
        const tarea = await TareaModel.findByPk(tareaId);
        if (tarea) {
            await tarea.update(tareaActualizada);
            res.json(tarea);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al editar la tarea' });
    }
});

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la tarea a eliminar
 *     responses:
 *       '200':
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       '404':
 *         description: Tarea no encontrada
 */
router.delete('/:id', async (req, res) => {
    const tareaId = req.params.id;
    try {
        const tarea = await TareaModel.findByPk(tareaId);
        if (tarea) {
            await tarea.destroy();
            res.json({ message: 'Tarea eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

/**
 * @swagger
 * /tareas/buscar:
 *   get:
 *     summary: Buscar tareas según criterios definidos
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Palabra clave para buscar en el título de las tareas
 *       - in: query
 *         name: completionStatus
 *         schema:
 *           type: string
 *         description: Estatus de completitud de las tareas
 *       - in: query
 *         name: isPublic
 *         schema:
 *           type: boolean
 *         description: Indica si las tareas son públicas
 *       - in: query
 *         name: sharedUsers
 *         schema:
 *           type: number
 *         description: Cantidad de usuarios con los que se comparte la tarea
 *       - in: query
 *         name: daysRemaining
 *         schema:
 *           type: number
 *         description: Días restantes para el vencimiento de las tareas
 *       - in: query
 *         name: fileFormat
 *         schema:
 *           type: string
 *         description: Formato de archivo de las tareas
 *     responses:
 *       '200':
 *         description: Tareas que coinciden con los criterios de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */
router.get('/buscar', async (req, res) => {
    const { keyword, completionStatus, isPublic, sharedUsers, daysRemaining, fileFormat } = req.query;

    try {
        const tareas = await TareaModel.findAll({
            where: {
                titulo: { [Op.like]: `%${keyword}%` },
                estatus_complecion: completionStatus,
                es_publica: isPublic,
                usuarios_compartidos: sharedUsers,
                dias_restantes: daysRemaining,
                formato_archivo: fileFormat
            }
        });

        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al realizar la búsqueda de tareas' });
    }
});

module.exports = router;
