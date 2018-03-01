let mongoose = require('mongoose');
let findOrCreate = require('mongoose-find-or-create');

let orgsSchema = new mongoose.Schema({
    username: {type: String},
    organisations: {type: []}
});

orgsSchema.plugin(findOrCreate)

let orgs = mongoose.model('Orgs', orgsSchema);

module.exports = orgs;