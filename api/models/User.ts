import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select:false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', async function (next) {
	const saltRound = 10;
	const password = this.password;

	const salt = await bcrypt.genSalt(saltRound);
	const hash = await bcrypt.hash(password, salt);

	this.password = hash;
	next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
	const user = this;
	const isPasswordValid = await bcrypt.compare(password, user.password);
	console.log('instance method isValidPassword ran: ' + isPasswordValid);

	return isPasswordValid;
};

UserSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

UserSchema.set('toJSON', {
	virtuals: true
});

const User = mongoose.model('User', UserSchema);

export default User;
