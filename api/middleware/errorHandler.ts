import { NextFunction, Response , Request} from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ errorMessage: err.message, errors: err })
}

export default errorHandler;
