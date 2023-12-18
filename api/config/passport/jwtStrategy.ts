import passportJWT from 'passport-jwt';
import { Request } from 'express';

import User from '../../models/User';

export interface VerifiedCallback {
  (error: any, user?: Express.User | false, info?: any): void;
}

const ExtractJwt = passportJWT.ExtractJwt;
const JWTstrategy = passportJWT.Strategy;

const JWTpassport = new JWTstrategy(
	{
		secretOrKey: process.env.TOKEN_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		passReqToCallback: true
	},
	async (req: Request, token: any, done: VerifiedCallback)  => {
		try {
			const user = await User.findById(token.user.id);
			if (user) {
				req.user = user;
				return done(null, user);
			}
			return done(null, false, { message: 'Invalid user token' });
		} catch (err) {
			return done(err);
		}
	}
);

export default JWTpassport;
