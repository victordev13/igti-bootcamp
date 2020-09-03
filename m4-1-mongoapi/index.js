import express from 'express';
import mongoose from 'mongoose';

import { accountRouter } from './routes/accountRoutes.js';

const app = express();
app.use(express.json());
app.use(accountRouter);

(async () => {
    await mongoose
        .connect(
            'mongodb://localhost:27017/accounts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
            {
                useNewurlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(console.log('Conexão com o MongoseDB iniciada!'))
        .catch((err) => {
            console.log('Erro na conexão com o MongoDB: ' + err);
        });
})();

app.listen(3000, () => {
    console.log('API Iniciada!');
});
