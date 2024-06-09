import { Container } from 'typedi';

class LoggerService {
  async getLogData() {
    try {
      const examples = await Container.get('example').findAll();
      const logData = examples.map((example) => JSON.stringify(example)).join('\n');
      return logData;
    } catch (error) {
      console.error('Error fetching examples:', error);
      throw error;
    }
  }
}

export default LoggerService;
