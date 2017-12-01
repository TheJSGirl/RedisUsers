const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const port = 3000;

//init app
const app = express();

//view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//method override
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('searchusers');
});

app.listen(port, () => {
  console.log('server started on port :', port);
})
