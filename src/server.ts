/// <reference path="./types/interfaces.d.ts"/>

import * as express from 'express';
import * as compression from 'compression';
import { Express, NextFunction, Request, Response } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as errorHandler from 'errorhandler';

import passport from './config/passport';

/**
 * Controllers (route handlers).
 */
import * as user from './controllers/user';
import * as page from './controllers/page';
import * as error from './controllers/error';

/**
 * Create Express server.
 */
const app: Express = express();

/**
 * Express configuration.
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');
app.use(passport.initialize());
app.use(passport.session());

/**
 * Primary app routes.
 */
app.get('/', page.home);
app.get('/about', page.about);
app.get('/login', user.getLogin);
app.post('/login', user.postLogin);
app.get('/profile', user.requireLogin, user.profile);
app.get('/logout', user.logout);

app.use(error.notFound);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  next(err);
});

app.use(error.internalError);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

app.listen(3000, () => console.log('Server listening on port 3000'));
