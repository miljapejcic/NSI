const { List } = require('../models/listModel')
const { Item } = require('../models/itemModel')


const CreateList = async (req, res) => {
    try {
        List.create({
            name: req.body.name,
            color: req.body.color,
            userId: req.params.userId,
        }).then(list => {
            res.status(200).send(list)
        }).catch(err => {
            console.log(err)
        })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const GetUsersLists = async (req, res) => {
    try {
        const userId = req.params.userId;
        let usersLists = await List.find({ userId });
        res.status(200).send(usersLists);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const GetList = async (req, res) => {
    try {
        const listId = req.params.listId;
        let list = await List.findOne({ _id:listId });
        let itemList = await Item.find({ listId });
        let sendInfo = {
            list: list,
            itemList: itemList
        }
        res.status(200).send(sendInfo);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const DeleteList = async (req, res) => {
    try {
        const listId = req.params.listId;
        const count = await Item.deleteMany({ listId })
        List.deleteOne({ _id: listId })
            .then(() => {
                res.status(200).send("List deleted successfully.")
            }).catch((err) => {
                res.status(404).send('List not found.')
            })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    CreateList,
    GetUsersLists,
    GetList,
    DeleteList
}