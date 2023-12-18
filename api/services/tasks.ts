import Task from '../models/Task';
import { TaskType } from '../types';
import { NotFoundError } from '../utils/errors/app-errors';

export async function getTaskService(userId: string, sort: any, skip: number, limit: number) {
	const tasks = await Task.find({ user: userId })
		.populate('user', 'name email')
		.sort(sort)
		.skip(skip)
		.limit(limit);

	return tasks;
}

export async function createTaskService({title, description, status, priority, user}:TaskType) {
	const newTask = await Task.create({
		title,
		description: description || '',
		status: status || 'pending',
		priority: priority || 'low',
		user: user
	});

	return newTask;
 
}

export async function updateTaskService(taskId: string, userId: string, updatedTask:unknown) {
	const taskUpdateCondition = { _id: taskId, user: userId };
	const updatedTasks = await Task.findOneAndUpdate(taskUpdateCondition, updatedTask, { new: true });

	if (!updatedTasks) {
		throw new NotFoundError('Task not found');
	}

	return updatedTasks;

}

export async function deleteTaskService(taskId: string, userId: string) {
	const taskDeleteCondition = { _id: taskId, user: userId };
	const deletedTask = await Task.findOneAndDelete(taskDeleteCondition);

	if (!deletedTask) {
		throw new NotFoundError('Task not found');
	}

	return deletedTask;
 
}
