import 'reflect-metadata'; // We need this in order to use @Decorators

import express from 'express';
import Logger from '#loaders/logger.js';
import config from '#config/index.js';
import loaders from '#loaders/index.js';



async function startServer() { 
  const app = express();

  await loaders({ expressApp: app });
  app.listen(config.port, () => {
    Logger.info(`Server running on port ${config.port}`);
  
  }).on('error', err => { 
    Logger.error(err);
    process.exit(1);// 0 성공적종료 1 오류로인한 종료
  });

}

startServer();