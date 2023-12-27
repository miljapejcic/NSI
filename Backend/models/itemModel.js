const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    isDone: {
        type: Boolean,
        required: true
    },
    listId: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('item', itemSchema);
module.exports = {
    Item
}
