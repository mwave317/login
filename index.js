const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyparser = require('body-parser');
const app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'lkasdhgklh309LKjdakas',
  resave: false,
  saveUninitialized: true
}))
const users = [
  {username: "Ken", password: "123", name: "Ken"},
  {username: "Admin", password: "admin", name: "John"},
  {username: "Sam", password: "appolo", name: "Sam"},
];

let response = "Please check your username and password";

app.get('/login', function(req, res) {
res.render("index");

});

app.get('/home', function(req, res){
res.render('home', {users: req.session.user });  //this needs to change to be {users: uses the info from the session}
});

app.post('/login', function (req, res) {
let user = null;
  for (let i=0; i<users.length; i++) {
    if (req.body.username === users[i].username && req.body.password === users[i].password){
      user = users[i];
      // console.log(user);
    }
} //End of for loop
if (user !== null){
req.session.user=user;
console.log(req.session.user);
  //add session information
  res.redirect('/home');
  console.log("Should be going to home page");
}
if (user === null) {
  res.render('index');
  console.log("Staying on the same page.");
}

});

app.listen(3090, function (){
  console.log("The server is listening!");
});
