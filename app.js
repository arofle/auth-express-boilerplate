import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './db/db.js';
import isEnvReady from './utils/isEnvReady.js';
import allRoutes from './routes/allRoutes.js';
import { periodicallyDeleteUnconfirmedAccounts } from './services/authService.js';

dotenv.config()

if (!isEnvReady()) {
  throw new Error('Write all necessary env fields before starting. Check isEnvReady file')
}

const app = express();

app.use(express.json());

if (process.env.SERVER_STAGE === 'development') app.use(morgan('dev'));

app.use(
  cors({
    origin: ['http://localhost:*', 'https://localhost:*'],
    credentials: true,
  })
);

app.use('/', allRoutes)

// GLOBAL ERROR HANDLER FOR uncaughtException
process.on('uncaughtException', (err) => {
  console.error(err);
});

// await sequelize.sync({ force: true })
await sequelize.sync()

periodicallyDeleteUnconfirmedAccounts()

const port = process.env.PORT || 8080
app.listen(port);
console.log(`Server started with pid: ${process.pid} on http://localhost:${port}`);
