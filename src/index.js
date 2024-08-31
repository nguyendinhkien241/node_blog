const path = require('path');
const express = require('express');
var methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

//HTTP logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

db.connect();
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'));
// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
        
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
