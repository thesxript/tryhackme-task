import Joi = require('joi');

export const userSchema = Joi.object({
	name: Joi.string()
		.alphanum()
		.required(),

	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
	email: Joi.string()
		.email()
});