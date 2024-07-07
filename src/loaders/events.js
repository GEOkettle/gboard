import Logger from '#loaders/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Container } from 'typedi';
import { Subject } from 'rxjs';


export default async () => { 
  const eventEmitter = new Subject();

  Container.set('eventEmitter', eventEmitter);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const eventsPath = path.join(__dirname, '../subscribers');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
  try {
    for (const file of eventFiles) {
      const filePath = pathToFileURL(path.join(eventsPath, file)).href;
      await import(filePath);
      Logger.info('Importing event file:', filePath);
    }
    Logger.info('✌️ All event subs have been loaded');
  } catch (e) {
    Logger.error('❌ failed to load subs');
  } 

}
