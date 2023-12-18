import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {

	const token = req.headers.authorization;

	console.log(token);

	if (!token) {
		return res.status(401).json({ error: 'JWT token is missing' });
	}

	jwt.verify(token,process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid JWT token' });
		}

		req.user = decoded;

		next();
	});
};


