import { Container } from 'typedi';
import { format } from 'date-fns'; // post moment.js
const now = new Date();


class ExampleDao {
  constructor() {
    this.exampleModel = Container.get('example');
  }

  async findAll() {
    return await this.exampleModel.findAll();
  }

  async findById(id) {
    const example = await this.exampleModel.findByPk(id);
    if (!example) throw new Error('Example not found');
    return example;
  }

  async create(data) {
    return await this.exampleModel.create({
      USER_NAME: data.userName,
      MEMO: data.memo,
      CREATED_AT: format(now, 'yyyy-MM-dd HH:mm:ss'),
    });
  }

  async update(id, data) {
    const [updated] = await this.exampleModel.update(
      {
        USER_NAME: data.userName,
        MEMO: data.memo,
        UPDATED_AT: format(now, 'yyyy-MM-dd HH:mm:ss'),
      },
      {
        where: { ID: id },
      }
    );
    if (updated) {
      return await this.findById(id);
    }
    throw new Error('Example not found');
  }

  async delete(id) {
    const deleted = await this.exampleModel.destroy({ where: { ID: id } });
    if (deleted) {
      return true;
    }
    throw new Error('Example not found');
  }
}

export default ExampleDao;
