let mongoose = require('mongoose');

let timeSchema = new mongoose.Schema({
    time: {type: Date},
    username: {type: String}
});

let time = mongoose.model('time', timeSchema);

module.exports = time;