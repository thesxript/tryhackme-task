import { Request, Response, NextFunction } from 'express';
import { RequestType } from '../types';
import { getAllUsersService ,getUserByIdService} from '../services/user';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await getAllUsersService();
		res.json(user);
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};

export const getUser = async (expressRequest: Request, res: Response, next: NextFunction) => {
	const req = expressRequest as RequestType;
	try {
		const user = await getUserByIdService(req.user.id);
		if (user) {
			return res.status(200).json(user);
		}
		return res.status(400).json({ errors: [{ message: 'No such document exists for the given Id' }] });
	} catch (error: unknown) {
		if(error instanceof Error){
			next(error);
		}
	}
};
