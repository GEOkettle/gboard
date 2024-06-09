import cron from 'node-cron';
import { Container } from 'typedi';


cron.schedule('*/5 * * * * *', async () => {
  try {
    const logData = await Container.get('JobexampleService').getLogData();

    // adding file logic here...
  } catch (error) {
    console.error('Error logging examples:', error);
  }
});