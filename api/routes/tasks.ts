import express from 'express';

const taskRouter = express.Router();

import verifyToken from '../middleware/auth';
import { getTask, createTask, updateTask, deleteTask } from '../controllers/tasks';

taskRouter
	.route('/')
	.get(verifyToken, getTask)
	.post(verifyToken, createTask);

taskRouter
	.route('/:id')
	.put(verifyToken, updateTask)
	.delete(verifyToken, deleteTask);

export default taskRouter;
