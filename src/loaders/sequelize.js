import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Logger from './logger.js';
import { Container } from 'typedi';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (dbConfig) => {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: console.log,
    dialectOptions: {
      connectTimeout: 60000, // 60초로 설정하여 타임아웃 시간 증가
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, 
      idle: 10000,
    },
  });

  try {
    await sequelize.authenticate();
    Logger.info(`Connection to ${dbConfig.dialect}.${dbConfig.database} has been established successfully.`);
    
    const models = {};
    const modelsPath = path.join(__dirname, '../models');

    const modelFiles = fs.readdirSync(modelsPath).filter((file) => file.endsWith('.js'));

    for (const file of modelFiles) {
      const filePath = pathToFileURL(path.join(modelsPath, file)).href;
      const module = await import(filePath);
      const modelFunc = module.default;
      const modelName = path.basename(file, '.js').toLowerCase();
      const model = modelFunc(sequelize);
      models[modelName] = model;
      Container.set(modelName, model);
    }
    await sequelize.sync({ alter: true });
    Logger.info(`✌️All models synchronized successfully for ${dbConfig.database}.`);
  } catch (error) {
    Logger.error(`Unable to connect to the database ${dbConfig.database}:`, error);
    throw error; 
  }

  return sequelize;
};
