import React from 'react'
import { Progress } from 'antd'
const Analytics = ( {allTransactions}) => {

  // total transaction
  const totalTransaction = allTransactions.length;
  const totalIncomeTransaction = allTransactions.filter(transaction => transaction.type === 'income').length;
  const totalExpenseTransaction= allTransactions.filter(transaction => transaction.type === 'expense').length;
  const totalIncomePercent = (totalIncomeTransaction/totalTransaction)*100;
  const totalExpensePercent = (totalExpenseTransaction/totalTransaction)*100;

  //total turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  
  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const totalExpenseTurnover = allTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const totalIncomeTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalIncomeTurnover / totalTurnover) * 100;
  
  const totalExpenseTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalExpenseTurnover / totalTurnover) * 100;
  

  return (
    <>
      <div className='row'>
        <div className="col-md-4">
            <div className='card'> 
                  <div className="card-header">
                    <h4 className="card-title">Total Transactions: {totalTransaction}</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="card-text "><span className='text-success'> Income:</span>  {totalIncomeTransaction}</h5>
                    <h5 className="card-text "><span className='text-danger'> Expense: </span> {totalExpenseTransaction}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} percent={totalIncomePercent.toFixed(0)} status="active" className='mx-2' />
                        <Progress type='circle' strokeColor={'red'} percent={totalExpensePercent.toFixed(0)} status="active" className='mx-2' />
                    </div>
                  </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className='card'> 
                  <div className="card-header">
                    <h4 className="card-title">Total TurnOver: {totalTurnover}</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="card-text "><span className='text-success'> Income:</span>  {totalIncomeTurnover}</h5>
                    <h5 className="card-text "><span className='text-danger'> Expense: </span> {totalExpenseTurnover}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} percent={totalIncomeTurnoverPercent.toFixed(0)} status="active" className='mx-2' />
                        <Progress type='circle' strokeColor={'red'}   percent={totalExpenseTurnoverPercent.toFixed(0)} status="active" className='mx-2' />
                    </div>
                  </div>
            </div>
        </div>
      </div>  
    </>
  )
}

export default Analytics