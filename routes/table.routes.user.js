const express = require('express');
const router = express.Router();
const userTableController = require('../controllers/table.controllers.user');

router.post('/booktable',userTableController.Booktable);
router.put('/updatetable/:id',userTableController.updateTable);
router.delete('/deletetable/:id',userTableController.deleteTable);
router.get('/gettable',userTableController.getTable);
module.exports = router;
