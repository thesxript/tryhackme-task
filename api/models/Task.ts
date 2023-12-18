import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		enum: ['pending', 'ongoing', 'completed'],
		default: 'pending'
	},
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
}, {
	timestamps: true
});
TaskSchema.index({ _id: 1, user: 1 }, { unique: true });

TaskSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

TaskSchema.set('toJSON', {
	virtuals: true
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
