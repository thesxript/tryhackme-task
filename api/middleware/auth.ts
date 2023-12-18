import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, function (err: any, user?: Express.User | false | null, info?: object | string | Array<string | undefined>,) {
    // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
    if (err || !user) {
      // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
      return next(info)
    } else {
      return next()
    }
  })(req, res, next)
};
