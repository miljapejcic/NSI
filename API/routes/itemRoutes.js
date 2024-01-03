const express = require('express');
const router = express.Router();

const { CreateItem, UpdateItem, DeleteItem, GetListItems } = require('../controllers/itemController');

router.post('/createItem/:listId', CreateItem)
router.put('/updateItem/:itemId', UpdateItem)
router.delete('/deleteItem/:itemId', DeleteItem)
router.get('/getListItems/:listId', GetListItems) //mozda mi ovo ne treba

module.exports = router