const express = require('express');
const router = express.Router();

const { CreateItem, UpdateItem, DeleteItem } = require('../controllers/itemController');

router.post('/createItem/:listId', CreateItem)
router.put('/updateItem/:itemId', UpdateItem)
router.delete('/deleteItem/:itemId', DeleteItem)

module.exports = router