import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import gradesRouter from './routes/grades.js';

const app = express();
app.use(express.json());
const { readFile, writeFile } = fs;
global.fileName = 'grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp}[${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'grades-control-api.log' }),
    ],
    format: combine(
        label({ label: 'grades-control-api' }),
        timestamp(),
        myFormat
    ),
});

// ENDPOINTS
app.use('/grades', gradesRouter);

app.listen(3000, async () => {
    //verificando se o arquivo base existe
    try {
        await readFile(global.fileName);
        logger.info('API Started!');
    } catch (err) {
        logger.error(err);
    }
});
