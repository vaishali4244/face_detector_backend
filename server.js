const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const  pgDatabase = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'ashu',
        database: 'smart-detect'
    }
});

const app = express();

app.use(cors())

app.use(express.json());

app.post('/signin',(req,res) =>{signin.handleSignin(req, res, pgDatabase, bcrypt)} )

app.post('/register', register.handleRegister(pgDatabase, bcrypt))

app.get('/profile/:id', (req,res) =>{profile.handleRegister(req, res, pgDatabase)})

app.put('/image', (req, res) => {image.handleImage(req, res, pgDatabase)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(5000, () => {
    console.log('this app is running on port 5000');
})