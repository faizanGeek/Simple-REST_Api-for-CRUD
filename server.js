require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/myroutes');
mongoose.connect(process.env.URL, {
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
	console.log(error);
});
db.once('open', () => {
	console.log('connected to database');
});

// app.use(express.json());
app.use(bodyParser.json());
app.use('/api/page', routes);

app.listen(8080, () => {
	console.log('started');
});
