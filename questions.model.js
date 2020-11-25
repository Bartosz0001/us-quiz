const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {type: String, required: true},
    questionMap: {type: String, required: true},
    ans1: {type:String, required: true},
    ans2: {type:String, required: true},
    ans3: {type:String, required: true},
    ans4: {type:String, required: true},
    ansCorrect: {type: String, required: true}
});

module.exports = mongoose.model('Question', questionSchema);