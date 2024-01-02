const express = require('express');
const router = express.Router();

const { CreateList, GetUsersLists, GetList, DeleteList } = require('../controllers/listController');

router.post('/createList/:userId', CreateList)
router.get('/getUsersLists/:userId', GetUsersLists)
router.get('/getList/:listId', GetList)
router.delete('/deleteList/:listId', DeleteList)

module.exports = router