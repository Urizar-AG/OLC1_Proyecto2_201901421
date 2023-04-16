import express from 'express';
import indexRouter from './routes/indexRoutes';

const app = express();
app.use(express.json()); //Transforma la req.body a json
const PORT = 3000;

app.use('/indexRoutes', indexRouter);

app.listen(PORT, () => {
   console.log(`Server runnig on port ${PORT}`);
});