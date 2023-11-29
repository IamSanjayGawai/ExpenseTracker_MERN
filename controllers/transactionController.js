const transactionModel = require('../models/transactionModel')



const getAlltransaction = async (req, res) => {
  try{
    const transactions = await transactionModel.find({});
    res.status(200).json(transactions)
  }
  catch(error){
    res.status(500).json(error)
  }
}

const addltransaction = async (req, res) => {
    try{
        const newTransaction = new transactionModel(req.body)

        await newTransaction.save();
        res.status(201).send('Transaction Created')

    }
    catch(error){
        res.status(500).json(error)
    }
}


module.exports = {getAlltransaction,addltransaction }