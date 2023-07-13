const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(bodyParser.json());

// подключаем мидлвары, роуты и всё остальное...
app.use((req, res, next) => {
  req.user = {
    _id: '64aedfd32e479216ea6e40f8',
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
