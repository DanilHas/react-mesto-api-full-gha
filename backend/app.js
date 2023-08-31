require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

mongoose.connect(MONGO_DB);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'https://mesto.project.nomoredomainsicu.ru',
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
