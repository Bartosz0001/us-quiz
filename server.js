const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const aws = require('aws-sdk');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/public')));

mongoose.connect(
  `mongodb+srv://${process.env.user}:${process.env.password}@cluster0-tia6e.mongodb.net/usquizDB?retryWrites=true&w=majority`, 
  { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const questions = router.get('questions', getQuestions = async (req, res) => {
  try {
    const results = await Question.find();
    if(!results) res.status(404).json({ message: 'Not Found!' });
    else res.json(results);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', questions);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});