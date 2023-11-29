const express = require('express');
const { addltransaction, getAlltransaction } = require('../controllers/transactionController');

const router = express.Router();


// add transaction
router.post('/add-transaction', addltransaction);

// get all transaction
router.get('/get-transaction', getAlltransaction);



module.exports = router;