import express from 'express';
import cors from 'cors';
// import { OpticMiddleware } from '@useoptic/express-middleware';
// import { start } from '@useoptic/cli-server';
import routes from '#api/index.js';
import config from '#config/index.js';
import Logger from './logger.js'
export default async ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
  */
  try {
    app.get('/status', (req, res) => {
      res.status(200).send('appCheck success');
    });
    app.head('/status', (req, res) => {
      res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.set('trust proxy', 1);

    const whitelist = ['http://localhost:5000'];
    const corsOptions = {
      origin: function (origin, callback) {
        if (!origin) {
          // origin이 undefined일 경우 처리

          callback(null, true);
          return;
        }

        if (whitelist.some((allowedOrigin) => origin.match(allowedOrigin))) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      optionsSuccessStatus: 200,
    };

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false })); // bodyparser
    app.use(express.json()); // bodyparser
    /// catch 404 and forward to error handler

    // Load API routes
    app.use(config.api.prefix, await routes());

    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
      // /**
      //  * Handle 401 thrown by express-jwt library
      //  */
      // if (err.name === 'UnauthorizedError') {
      //   return res.status(err.status).send({ message: err.message }).end();
      // }
      return next(err);
    });
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    });
    Logger.info('✌️ Express loaded');
    
    } catch (e) { 
    Logger.error('❌ failed to load Express');
  }


};


