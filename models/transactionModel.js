const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount:{
        type: String,
        required: [true, 'amount is required']
    },
    category:{
        type: String,
        required: [true, 'category is required']
    },
    reference:{
        type: String,
    },
    description:{
        type: String,
        required: [true, 'description is required']
    },
    date:{
        type: Date,
        required: [true, 'date is required']
    },

    

},{tomestamps: true});



const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;