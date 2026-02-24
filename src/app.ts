import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/errorHandler.js';
import healthRoutes from './modules/health/health.routes.js';
import timeEntriesRoutes from './modules/time-entries/time-entries.routes.js';
import userPreferencesRoutes from './modules/user-preferences/user-preferences.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/health', healthRoutes);
app.use('/api/time-entries', timeEntriesRoutes);
app.use('/api/user-preferences', userPreferencesRoutes);

const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

app.use(errorHandler);

export default app;
