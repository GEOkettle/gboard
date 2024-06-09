import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import config from '#config/index.js';
import Logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const projectName = packageJson.name;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${projectName} API Documentation`,
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Example',
        description: 'Example management',
      },
    ],
  },
  apis: ['./src/api/routes/*.js', './src/api/controllers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);



const saveSwaggerSpec = (spec, format = 'json') => {
  if (config.nodeMode !== 'production') {
    const dirPath = path.resolve(__dirname, `../../docs/${projectName}API`);
    const filePath = path.resolve(dirPath, `swagger-spec.${format}`);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, format === 'yaml' ? yaml.dump(spec) : JSON.stringify(spec, null, 2));
  }
};

export default async (app) => {
  try {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    saveSwaggerSpec(swaggerSpec, 'json'); 
    saveSwaggerSpec(swaggerSpec, 'yaml');
    Logger.info('✌️ Swagger loaded');

  } catch (e) {
    Logger.error('❌ failed to load Swagger');
  }
};
