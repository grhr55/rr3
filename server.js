const express = require('express');
const mongoose = require('mongoose');
const Zauv = require('./components/Zauvs');
const compression = require('compression');
const dotenv = require ('dotenv');
const cors = require('cors');
const path = require ('path')



const app = express();
const port = 5000;


app.use('/img', express.static(path.join(__dirname, '/img')))

app.use(cors());
dotenv.config();
app.use(compression());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Главный маршрутизатор сервер успешно подключен');
    })
    .catch(err => {
        console.log('Ошибка подключения к MongoDB:', err);
    });


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));







app.use('/zyuvs', Zauv);







// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
