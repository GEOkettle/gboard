import 'reflect-metadata';

class ExampleController {
  constructor(exampleService) {
    this.exampleService = exampleService;
  }

  /**
   * retrieve ALl data.
   * @returns {Array[Object]} 두 숫자의 합
   */
  getExample = async (req, res, next) => {
    try {
      const result = await this.exampleService.getExample();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };


  postExample = async (req, res, next) => {
    try {
      const result = await this.exampleService.postExample(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  putExample = async (req, res, next) => {
    try {
      const result = await this.exampleService.putExample(req.params.id, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  deleteExample = async (req, res, next) => {
    try {
      const result = await this.exampleService.deleteExample(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default ExampleController;
