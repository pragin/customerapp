const express =  require('express');
const bodyParser = require('body-parser');
const path = require('path');
 //const expressValidator = require('express-validatior');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customers');
const db = mongoose.connection;

const app = express();

let Schema = mongoose.Schema;

//create a Schema
let userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String
});

let User = mongoose.model('User',userSchema);

// Middlewares
// let myLogger = (req, res, next) => {
//   console.log('LOGGING..');
//   next();
// }

// // app.use(myLogger);
//
// let requestTime = (req, res, next) => {
//     req.requestTime = Date.now();
//     next();
// }
//
// app.use(requestTime);

//View Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')))

let user = new User({
  first_name: 'sandra',
  last_name: 'Raj',
  email: 'aaa@hotmail.com'

});

app.get('/', (req, res) => {
  db.on('error', console.error.bind(console, 'connection error'));
    User.find({}, function(err, users){
      if(err) throw err;
      res.render('index',{
       title: 'Customers',
       users: users
     });
  });
});

app.post('/users/add', (req, res) => {
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  db.on('error', console.error.bind(console, 'connection error'));
      User.create(newUser, function(err, result) {
        if (err) console.log(err);
        res.redirect('/');
    });
  });
app.listen(3000, () => console.log('Server started at port 3000...'));
