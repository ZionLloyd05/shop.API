const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { envVariables } = require('../helpers');
const userController = require('../controllers/user.controller');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = envVariables.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await userController.getUserById(jwtPayload.id);
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
      return;
    } catch (error) {
      console.log(error);
    }
  }));
};
