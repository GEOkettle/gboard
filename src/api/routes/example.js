import { Router } from 'express';
import { Container } from 'typedi';
import ExampleController from '../controllers/exampleController.js';

const route = Router();

export default (app) => {
  app.use(async (req, res, next) => {
    try {
      const exampleService = await Container.get('ExampleService');
      const exampleController = new ExampleController(exampleService);

      /**
       * @swagger
       * tags:
       *   name: Example
       *   description: Example management
       */

      /**
       * @swagger
       * /api/example:
       *   get:
       *     summary: Retrieve a list of examples
       *     tags: [Example]
       *     responses:
       *       200:
       *         description: A list of examples
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 type: object
       */
      route.get('/', exampleController.getExample);

      /**
       * @swagger
       * /api/example:
       *   post:
       *     summary: Create a new example
       *     tags: [Example]
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *     responses:
       *       200:
       *         description: Successfully created
       *         content:
       *           application/json:
       *             schema:
       *               type: boolean
       */
      route.post('/', exampleController.postExample);

      /**
       * @swagger
       * /api/example:
       *   put:
       *     summary: Update an example
       *     tags: [Example]
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *     responses:
       *       200:
       *         description: Successfully updated
       *         content:
       *           application/json:
       *             schema:
       *               type: boolean
       */
      route.put('/:id', exampleController.putExample);

      /**
       * @swagger
       * /api/example:
       *   delete:
       *     summary: Delete an example
       *     tags: [Example]
       *     responses:
       *       200:
       *         description: Successfully deleted
       *         content:
       *           application/json:
       *             schema:
       *               type: boolean
       */
      route.delete('/:id', exampleController.deleteExample);

      app.use('/example', route);

      next();
    } catch (err) {
      next(err);
    }
  });
};
