import express, {json} from 'express';

const app = express();
const port:number = 3000;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Success' });
});

app.use(json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
