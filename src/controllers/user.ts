/// <reference path="../types/interfaces.d.ts"/>

import * as express from 'express';
import { Request, Response, NextFunction, Router } from 'express';
//import {LocalStrategyInfo} from "passport-local";

import passport from '../config/passport';

import User from '../models/user';

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

/**
* GET /
* Login page.
*/
export const getLogin = (req: Request, res: Response): void => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login', {
    user: req.user,
  });
};

/**
* POST /
* Login page.
*/
export const postLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate('local', (err: Error, user: User, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      res.redirect(req.session.returnTo || '/profile');
    });
  })(req, res, next);
};

/**
* GET /
* Profile page.
*/
export const profile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  User.findById(req.user.id, (err?: any, user?: User): void => {
    if (err) {
      return next(err);
    }
    res.status(200).render('profile', {
      user: req.user,
      ...user,
    });
  });
};

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};
