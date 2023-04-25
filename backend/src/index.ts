import cors from 'cors';
import express from 'express';
import indexRouter from './routes/indexRoutes';

const app = express();
app.use(cors());
app.use(express.json()); //Transforma la req.body a json
const PORT = 3000;

app.use('/indexRoutes', indexRouter);

app.listen(PORT, () => {
   console.log(`Server runnig on port ${PORT}`);
});