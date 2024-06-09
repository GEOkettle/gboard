import Logger from './logger.js';
import expressLoader from './express.js';
import sequelizeLoader from './sequelize.js';
import swaggerLoader from './swagger.js';
import config from '#config/index.js';
import serviceLoader from './serviceInjector.js';
import { Container } from 'typedi';
import eventLoader from './events.js'
import scheduleLoader from './jobs.js'
export default async ({ expressApp }) => {
  Logger.info('✌️ Loaded');

  /**
   * @TODO import DB, routes, schedules etc before serverStart
   *   */

  //DB
  const databaseConnections = [];

  for (const db of config.databases) {
    if (db.existence) {
      try {
        //Models DI
        const connection = await sequelizeLoader(db.config);

        await connection.sync({ alter: true });
        Logger.info(`✌️ All models synchronized successfully for ${db.config.database}.`);

        databaseConnections.push(connection);

        Logger.info(`✌️ Connected to ${db.config.dialect} database: ${db.config.database}`);
      } catch (error) {
        Logger.error(`❌ Error connecting to ${db.config.dialect} database: ${db.config.database}`, error);
      }
    }
  }

  //DB DI
  Container.set('dbConn', databaseConnections);
  Logger.info('✌️ Dependency injected');
  swaggerLoader(expressApp); //Swagger
  serviceLoader(); //services DI
  eventLoader(); //subscribers
  scheduleLoader();//schedules
  expressLoader({ app: expressApp }); //routers
};
  