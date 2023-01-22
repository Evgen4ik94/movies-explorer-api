require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter, devDatabaseUrl } = require('./utils/options');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

const app = express();

app.use(requestLogger);
app.use(limiter); // подключение rate-limiter
app.use(cors());
app.use(bodyParser.json()); // сбор данных в JSON-формате
app.use(helmet()); // настройка заголовков
app.use(router);
app.use(errorLogger);
app.use(errors()); // подключение обработчика ошибок celebrate
app.use(errorHandler); // подключение мидлвары централизованного обработчика ошибок

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : devDatabaseUrl);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listen at port ${PORT}`);
});

// файл .env не выгружается на Github, но в нем записаны следующие данные:
// NODE_ENV = production
// JWT_SECRET = 'a4768f7eb2a93f64b0dcbc8998e135deb28135ebcfc17578f96d4d65b6c78'
// PORT = 3000
// DATABASE_URL = 'mongodb://localhost:27017/movies-db'
