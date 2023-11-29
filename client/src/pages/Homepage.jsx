import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { Modal, Form, Select, message, Table } from "antd";
import axios from "axios";
import All_Transaction from "../components/All_Transaction";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
         const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        await axios.post('http://localhost:8080/api/v1/transactions/add-transaction', {...values, userid: user._id })
        setLoading(false);
        message.success('Transaction Added Successfully');
        setShowModal(false);
    } catch (error) {
        message.error('Failed to Add Transaction');
    }
  };


  const handleModalCancel = () => {
    setShowModal(false);
    setLoading(false)
  }







  return (
    <Layout>
      <div className="filters bx-sd3">
        <div>Range Filters</div>
        <div>
          {" "}
          <button
            className="btn btn-primary text-white "
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>{" "}
        </div>
      </div>


{/* showng  all data in table  */}
   <All_Transaction />
{/* showng  all data in table  */}


      {/* Start Model */}
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={handleModalCancel}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
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
