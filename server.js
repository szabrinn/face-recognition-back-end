const express = require( 'express');
const app = express();

const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'face'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => { res.send(database.users) })

// app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)}); 
// OR
app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3000,()=> {
	console.log('app is running on port 3000');
})

// process.setMaxListeners(0);