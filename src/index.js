import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { PORT } from './utils/config.js';
import { logger } from './utils/logger.js';
import { getV1Routes } from './routes/v1/index.js';
import connectDatabase from './utils/db.js';
// import { getAdminRoutes } from './routes/admin/index.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use(cors({
  origin: ["http://localhost:5173", "https://excel-sheet-generator.netlify.app"],
  methods: "GET,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}));

app.use('/v1', getV1Routes());
// app.use('/admin', getAdminRoutes());

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});