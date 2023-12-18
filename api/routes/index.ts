import express from 'express';
import taskRouter from './tasks';
import userRouter from './users';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/tasks', taskRouter);

export default apiRouter;