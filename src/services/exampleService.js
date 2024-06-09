import ExampleDao from './daos/exampleDao.js';
import ExampleDto from './dtos/exampleDto.js';
import { Container } from 'typedi';
class ExampleService {
  constructor() {
    this.exampleDao = new ExampleDao();
  }

  async getExample() {
    try {
      const examples = await this.exampleDao.findAll();
      const exampleDtos = examples.map(
        (example) =>
          new ExampleDto({
            id: example.ID,
            userName: example.USER_NAME,
            memo: example.MEMO,
            createdAt: example.CREATED_AT,
            updatedAt: example.UPDATED_AT,
          })
      );
      return { status: true, result: exampleDtos };
    } catch (error) {
      console.error('Error fetching examples:', error);
      return { status: false, error: error.message };
    }
  }

  async postExample(data) {
    try {
      const example = await this.exampleDao.create(data);
      const exampleDto = new ExampleDto({
        id: example.ID,
        userName: example.USER_NAME,
        memo: example.MEMO,
        createdAt: example.CREATED_AT,
        updatedAt: example.UPDATED_AT,
      });

      const eventEmitter = Container.get('eventEmitter');
      eventEmitter.next({ type: 'exampleCreated', payload: exampleDto });
      
      return { status: true, result: exampleDto };
    } catch (error) {
      console.error('Error creating example:', error);
      return { status: false, error: error.parent?.sqlMessage || error.message };
    }
  }

  async putExample(id, data) {
    try {
      const example = await this.exampleDao.update(id, data);
      const exampleDto = new ExampleDto({
        id: example.ID,
        userName: example.USER_NAME,
        memo: example.MEMO,
        createdAt: example.CREATED_AT,
        updatedAt: example.UPDATED_AT,
      });
      return { status: true, result: exampleDto };
    } catch (error) {
      console.error('Error updating example:', error);
      return { status: false, error: error.message };
    }
  }

  async deleteExample(id) {
    try {
      await this.exampleDao.delete(id);
      return { status: true };
    } catch (error) {
      console.error('Error deleting example:', error);
      return { status: false, error: error.message };
    }
  }
}

export default ExampleService;
