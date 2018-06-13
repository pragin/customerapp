const express =  require('express');
const bodyParser = require('body-parser');
const path = require('path');
 //const expressValidator = require('express-validatior');

const app = express();


// Middlewares
let myLogger = (req, res, next) => {
  console.log('LOGGING..');
  next();
}

app.use(myLogger);

let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

app.use(requestTime);

//View Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')))

let users = [
  {
    id: 1,
    first_name: 'Pragin',
    last_name: 'Martin',
    age: 33
  },
  {
    id: 2,
    first_name: 'Shenora',
    last_name: 'Arul',
    age: 30
  },
  {
    id: 3,
    first_name: 'sandra',
    last_name: 'Kacka',
    age: 33
  }]

app.get('/', (req, res) => {
  // let responseText = 'Hello World<br/>'
  // responseText += '<small> Requested at : ' + req.requestTime + '</small>'
  res.render('index',{
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', (req, res) => {
  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  console.log(user);
});
app.listen(3000, () => console.log('Server started at port 3000...'));
