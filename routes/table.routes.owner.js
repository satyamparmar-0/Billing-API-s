const express = require('express');
const router = express.Router();

const ownercontroller = require('../controllers/table.controller.owner');

router.post('/createtable',ownercontroller.createOrderForTable);
router.post('/addtable',ownercontroller.addtable);
module.exports = router;