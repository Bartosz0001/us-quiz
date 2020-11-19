const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0-tia6e.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});