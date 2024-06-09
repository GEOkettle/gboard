import { Container } from 'typedi';
import Logger from '#loaders/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default async () => {
  const servicesPath = path.join(__dirname, '../services');
  const serviceFiles = fs.readdirSync(servicesPath).filter((file) => file.endsWith('.js'));

  try {
    for (const file of serviceFiles) {
      const filePath = pathToFileURL(path.join(servicesPath, file)).href;
      const module = await import(filePath);
      const serviceClass = module.default;
      const serviceInstance = new serviceClass();
      const serviceName = capitalizeFirstLetter(path.basename(file, '.js')); // 파일 이름을 기반으로 서비스 이름 설정
      Container.set(serviceName, serviceInstance);
      Logger.info('serviceName')
      Logger.info(serviceName)
    }
    Logger.info('✌️ All services are registered successfully');
  } catch (e) {
    Logger.error(`❌ Unable to register services: ${e.message}`);
  }
};
