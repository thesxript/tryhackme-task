import express from 'express';

const userRouter = express.Router();
import verifyToken from '../middleware/auth';

import { getUser, getUsers } from '../controllers/users';
import { signUp, login } from '../controllers/auth';
import { registerValidation, loginValidation } from '../middleware/authValidation';


userRouter
	.route('/')
	.get(verifyToken, getUser)
	.post(registerValidation,  signUp);

userRouter
	.route('/login')
	.post(loginValidation, login);

userRouter
	.route('/all')
	.get( verifyToken, getUsers);


export default userRouter;
