import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { Modal, Form, Select, message, Table, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from 'moment';
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import {loadingSpinnerActive, setAllTransactions} from '../redux/expenseSlice.jsx'

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [form] = Form.useForm(); // useform it is use for reset form data aftyer evry transaction
  const [selectedDate, setSelectedDate] = useState({})

  const {loadingSpinner, allTransactions} = useSelector(state => state.expense);
  const dispatch = useDispatch();

  
const  columns = [
  {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>

  },
  {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
  },
  {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
  },
  {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
  },
 
  {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
  },
  // {
  //     title: 'Reference',
  //     dataIndex: 'reference',
  //     key: 'reference',
  // },
  {
      title: 'Actions',

  },
]

   
    
useEffect(() => {
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(loadingSpinnerActive(true));
      const res = await axios.post('http://localhost:8080/api/v1/transactions/get-transaction', {
          userid: user._id,
          frequency,
          selectedDate 
        });
      console.log(selectedDate)
      dispatch(loadingSpinnerActive(false));
      dispatch(setAllTransactions(res.data));
    } catch (error) {
      console.log(error);
      message.error('Failed to fetch transactions');
    }
  }

  getAllTransactions();

}, [frequency, selectedDate]);
  // table data



  // Handle form submission
  const handleSubmit = async (values) => {
    try {
         const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', {...values, userid: user._id })
        setLoading(false);
        message.success('Transaction Added Successfully');
        setShowModal(false);
        form.resetFields(); // reset form data aftyer evry transaction
      
    } catch (error) {
        message.error('Failed to Add Transaction');
    }
  };



  const handleModalCancel = () => {
setShowModal(false);
setLoading(false)
form.resetFields();  // reset form data aftyer evry transaction



  }







  return (
    <Layout>
      <div className="filters bx-sd3">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values) }>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)}/>}
        </div>
        <div>

          <button
            className="btn btn-primary text-white "
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>


{/* showng  all data in table  */}
    
<div className="content mt-3 ">
   
   <Table columns={columns} dataSource={allTransactions} bordered />

 </div>

{/* showng  all data in table  */}


      {/* Start Model */}
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={handleModalCancel}
        footer={false}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <input type="number" className="form-control" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="freeLance">Freelance</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <input type="date" className="form-control" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <input type="text" className="form-control" />
          </Form.Item>
          {/* <Form.Item label="Reference" name="reference">
            <input type="text" className="form-control" />
          </Form.Item> */}
          <div className="d-flex justify-content-end">
            
            <button className="btn btn-primary" type="submit"  disabled={loading}>
              <span
                className={loading ? "spinner-border spinner-border-sm" : " "}
                role="status"
                aria-hidden="true"
              />
            {loading ?  'Saving...' : "Save"}
            </button>
          </div>
        </Form>
      </Modal>
      {/* End Model */}
    </Layout>
  );
};

export default Homepage;
