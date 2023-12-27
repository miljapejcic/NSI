const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    }
})

const List = mongoose.model('list', listSchema);
module.exports = {
    List
}
