import express from 'express';
import { PORT } from './utils/config.js';
import { logger } from './utils/logger.js';
import { getV1Routes } from './routes/v1/index.js';
import { getAdminRoutes } from './routes/admin/index.js';

const app = express();

app.use(logger);

app.use('/v1', getV1Routes());
app.use('/admin', getAdminRoutes());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});