const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const port = 3000;

//init app
const app = express();

//create redis client
let client = redis.createClient();
client.on('connect', () => {
  console.log('connected to redis');
});

//view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//method override
app.use(methodOverride('_method'));

//Search Page
app.get('/', (req, res) => {
  res.render('searchusers');
});

//Search processing
app.post('/user/search', (req, res) => {
  let id = req.body.id;
  client.hgetall(id,  (err,obj) => {
    if(!obj){
      res.render('searchusers', {
        error: 'User does not exist'
      })
    }else {
      obj.id =id;
      res.render('details', {
        user: obj
      })
    }
  });
});

//Add userpage
app.get('/user/add', (req, res) => {
  res.render('adduser');
});

app.listen(port, () => {
  console.log('listen at port :', port);
});
