import { Request, Response, NextFunction } from 'express';
import { RequestType } from '../types';
import { createUserService, loginUserService } from '../services/auth';
import { userSchema } from '../validators/auth';

export const signUp =  async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password } = req.body;
	userSchema.validate({ name, email, password });
	
	try {
		const token = await createUserService(name, email, password);
		res.json({ token });
	}catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};

export const login = async (expressRequest: Request, res: Response, next: NextFunction) => {
	const req =  expressRequest as RequestType;

	const {email, password}=req.body;

	try {
		const token = await loginUserService(email, password);
		res.json({ token });
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};


