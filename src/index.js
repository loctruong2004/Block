const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const sortMiddleware = require('./app/middleware/sortMiddleware')

const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');


app.use(express.static(path.join(__dirname, 'recources', 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
db.connect();

app.use(morgan('combined'));
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers:{
            sum: (a,b)=> a+b,
            sortable:(field,sort)=>{
               const sortType = field === sort.column ? sort.type : 'default'; 

               const icons = {
                default: 'oi oi-elevator',
                asc:'oi oi-sort-ascending',
                desc:'oi oi-sort-descending',
               }
               const types = {
                default:'desc',
                asc:'desc',
                desc:'asc',

               }
                 
               const icon = icons[sortType];
               const type = types[sortType];
               return ` <a href="?_sort&column=${field}&type=${type}"> 
                             <span class="${icon}"></span>
                        </a>`
            }
        }
    }),
);
app.use(methodOverride('_method'))
// custom middleware
app.use(sortMiddleware)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'recources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
