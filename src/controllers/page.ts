import { Request, Response /*NextFunction,*/ } from 'express';

export const home = (req: Request, res: Response): void => {
  res.render('home', {
    user: req.user,
    title: 'Home Page',
  });
};

export const about = (req: Request, res: Response): void => {
  res.render('home', {
    user: req.user,
    title: 'About Page',
  });
};
