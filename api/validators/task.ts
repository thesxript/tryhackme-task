import Joi from 'joi';

const taskSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	status: Joi.string(),
	priority: Joi.string(),
	user: Joi.string().required(),
});

export default taskSchema;