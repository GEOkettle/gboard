import { Router } from 'express';
import Logger from '#loaders/logger.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async () => {
  const app = Router();

  const routesPath = path.join(__dirname, 'routes');
  const routeFiles = fs.readdirSync(routesPath).filter((file) => file.endsWith('.js'));
  try {
    for (const file of routeFiles) {
      const filePath = pathToFileURL(path.join(routesPath, file)).href;
      const module = await import(filePath);
      const modelFunc = module.default;
      await modelFunc(app)
      }
      Logger.info(`✌️ All routes are registered successfully`);
      } catch (e) { 
      Logger.error(`Unable to register routes`);

    }
  return app;
};
