import passport from 'passport';

import JWTpassport from './passport/jwtStrategy';
import localStrategyLogin from './passport/localStrategy';

passport.use('login', localStrategyLogin);
passport.use(JWTpassport);

export default passport;
