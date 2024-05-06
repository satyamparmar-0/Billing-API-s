const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const paymentController = require('../controllers/payments');
const Publishablekey = 'pk_test_51PBxZ8SHttKUoHIEiBVhe9shC4vuXPDMre4kKN4qqrG08LGGvoyAN5b9twusJKQ4x6aI29YdY4eanZDLYBRjRK9B00JhKlaKR1'


router.post('/createPayment',bodyParser.raw({type:"application/json"}),paymentController.createPayment);

module.exports = router