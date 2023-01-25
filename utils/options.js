const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // за 5 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const devDatabaseUrl = 'mongodb://0.0.0.0:27017/bitfilmsdb';

const devJwtKey = 'dev-secret-key';

module.exports = {
  limiter,
  devDatabaseUrl,
  devJwtKey,
};
