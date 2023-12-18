import User from '../models/User';
import { NotFoundError } from '../utils/errors/app-errors';

export async function getAllUsersService() {
	const users = await User.find();
	return users;
}

export async function getUserByIdService(userId: string) {
	const user = await User.findById(userId).select('-password');
	
	if(!user){
		throw new NotFoundError('User not found');
	}

	return user;
}