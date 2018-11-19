require('dotenv').config();

const express = require('express');
const app = express();

const user = require('./controllers/usercontroller');
const bike = require('./controllers/bikecontroller');
const ride = require('./controllers/ridecontroller');
const trail = require('./controllers/trailcontroller');

const sequelize = require('./db');
const bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/validatesession'));
app.use('/bikes', bike);
app.use('/rides', ride);
app.use('/trails', trail);

app.listen(process.env.PORT, () => console.log(`.....!@#$%^&**&^%$#@! APP IS LISTENING ON ${process.env.PORT} !@#$%^&**&^%$#@!.....`));