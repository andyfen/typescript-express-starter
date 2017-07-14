/// <reference path="../types/interfaces.d.ts"/>

import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findByEmail(email.toLowerCase().trim(), (err?: any, user?: User) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id: number, done) => {
  User.findById(id, (err?: any, user?: User) => {
    if (err) {
      return done(err);
    }
    done(err, user);
  });
});

export default passport;
