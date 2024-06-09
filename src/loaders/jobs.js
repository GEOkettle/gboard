import Logger from '#loaders/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Container } from 'typedi';


export default async () => { 

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const jobsPath = path.join(__dirname, '../jobs');
  const jobFiles = fs.readdirSync(jobsPath).filter((file) => file.endsWith('.js'));

  try {
    for (const file of jobFiles) {
      const filePath = pathToFileURL(path.join(jobsPath, file)).href;
      await import(filePath);
      Logger.info('Importing job file:', filePath);
    }
    Logger.info('✌️ All schedules have been loaded');
  } catch (e) {
    Logger.error('❌ failed to load schedules');
  } 
}
