import { Request } from 'express';
import { RequestType } from './index';

declare global {
  namespace Express {
    interface Request {
      requestType: RequestType;
    }
  }
}