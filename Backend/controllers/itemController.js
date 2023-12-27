const { Item } = require('../models/itemModel')

const CreateItem = async (req, res) => {
    try {
        Item.create({
            name: req.body.name,
            description: req.body.description,
            isDone: false,
            listId: req.params.companyID,
        }).then(item => {
            res.status(200).send(item)
        }).catch(err => {
            console.log(err)
        })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const UpdateItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        let item = await Item.findOne({ _id: itemId });
        item.name = req.body.name;
        item.description = req.body.description;
        item.isDone = req.body.isDone;
        item.listId = req.body.listId;
        item.save().then((result) => {
            res.status(200).send(result)
        })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const DeleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        Item.deleteOne({ _id: itemId })
            .then(() => {
                res.status(200).send("Item deleted successfully.")
            }).catch((err) => {
                res.status(404).send('Item not found.')
            })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const GetListItems = async (req, res) => {
    try {
        const listId = req.params.listId;
        let listsItems = await Item.find({ listId });
        res.status(200).send(listsItems);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateItem,
    UpdateItem,
    DeleteItem,
    GetListItems
}