import express, { Request, Response } from 'express';
// import { connectDB } from './database/data';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import authRoutes from './routes/authRoutes';

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());

// app.use('/auth', authRoutes)

// const PORT = 3000;

// let users = []

// const SECRET_KEY ="Key";

// app.get('/', (req:Request , res: Response) => {
//   res.send('Server is running!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



