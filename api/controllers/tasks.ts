import { NextFunction, Request, Response } from 'express';


import { RequestType, UpdateTaskType } from '../types';
import { handleQuerySort } from '../helpers/handleQuerySort';
import { getTaskService,createTaskService, updateTaskService, deleteTaskService } from '../services/tasks';
import taskSchema from '../validators/task';



export const getTask = async (expressRequest: Request , res: Response, next: NextFunction) => {
	const req =  expressRequest as RequestType;

	try {
		const sort = req.query.sort ? handleQuerySort(req.query.sort) : { createdAt: -1 };
		const skip =  req.query.skip ? req.query.skip : 0;
		const limit =  req.query.limit ? req.query.limit : 10;
		const tasks = await getTaskService(req.user.id, sort, skip, limit);
		res.json({ success: true, tasks });
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};

export const createTask = async (expressRequest: Request, res: Response, next: NextFunction) => {
	const req =  expressRequest as RequestType;
	const { title, description, status, priority } = req.body;
	taskSchema.validate({ title, description, status, priority } );

	// Simple validation
	if (!title)
		return res.status(400).json({ success: false, message: 'Title is required' });

	try {
		const taskData={
			title,
			description: description || '',
			status: status || 'pending',
			priority: priority || 'low',
			user: req.user.id
		};
		const newTask = await createTaskService(taskData);
		res.json({ success: true, message: 'Task created successfully', task: newTask });
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};


export const updateTask = async (expressRequest: Request, res: Response, next: NextFunction) => {
	const req =  expressRequest as RequestType;
	const { title, description, status, priority } = req.body;

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' });

	try {
		let updatedTask: UpdateTaskType = {
			title,
			description: description || '',
			status: status || 'pending',
			priority: priority || 'low',
		};

		const taskUpdateCondition = { _id: req.params.id, user: req.user.id };
		updatedTask = await updateTaskService(taskUpdateCondition._id,taskUpdateCondition.user,updatedTask);

		// User not authorised to update task or task not found
		if (!updatedTask)
			return res.status(401).json({
				success: false,
				message: 'Task not found or user not authorised'
			});

		res.json({
			success: true,
			message: 'Task updated',
			task: updatedTask
		});
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};

export const deleteTask = async (expressRequest: Request, res: Response, next: NextFunction) => {
	const req =  expressRequest as RequestType;
	try {
		const taskDeleteCondition = { _id: req.params.id, user: req.user.id };
		const deletedTask=await deleteTaskService(taskDeleteCondition._id,taskDeleteCondition.user);

		if (!deletedTask)
			return res.status(401).json({
				success: false,
				message: 'Task not found or user not authorised'
			});

		res.json({ success: true, task: deletedTask });
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};
