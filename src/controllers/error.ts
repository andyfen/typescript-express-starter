/// <reference path="../types/interfaces.d.ts"/>

import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response):void => {
  res.status(404)
    .render('error', {
      message: '404: Page not Found'
    });
 }

 export const internalError = (err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(err.status || 500)
   res.render('error', {
     message: '500: Internal Server Error'
   });
 }
