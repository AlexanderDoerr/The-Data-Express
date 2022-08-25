console.log('It is born');
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

const session = require('express-session');
const sessionconfig = {
    secret: 'Chunk',
    cookie: {}
};
app.use(session(sessionconfig));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

const indexRouter = require('./routes/index');
app.use('', indexRouter);

const usersRouter = require('./routes/users');
app.use('/u', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );