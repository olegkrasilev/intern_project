import express, { Request, Response } from 'express';

const app = express();
app.disable('x-powered-by');

const port = 3002;

app.get('/', (request: Request, response: Response) => {
  response.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


