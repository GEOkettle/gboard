import { Container } from 'typedi';

const eventEmitter = Container.get('eventEmitter');


eventEmitter.subscribe({
  next: (event) => {
    if (event.type === 'exampleCreated') {
      console.log(Container.get('ExampleService'))
      console.log('New example created:', event.payload);
    }
  },
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Event stream completed')
});
