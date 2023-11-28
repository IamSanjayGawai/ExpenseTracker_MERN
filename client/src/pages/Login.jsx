import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add this import for Axios
import SubmitSpinner from '../components/SubmitSpinner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // form submit antd takes values instead of events
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:8080/api/v1/users/login', values);
      setLoading(false);
      message.success('Login Successful');

      localStorage.setItem('userInfo', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      // Message.error(error.response.data.message)
      setLoading(false);
      message.error('Invalid Credentials');
    }
  };

  return (
    <>

      <div className='register-page container-fluid d-flex justify-content-center'>
        <div className='row  d-flex justify-content-center' style={{height:'70%', width:'100%'}}>
        <Form layout='vertical' onFinish={submitHandler} className='col-12 col-sm-8 col-md-6 col-lg-4 p-5 bx-sd2' >
          <h1>Login</h1>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Enter your email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' placeholder='Enter your password' />
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <Link to='/register'>Not a User? Click Here to Register </Link>
            {
              loading ? <SubmitSpinner/> :
              <button className='btn btn-primary' htmlType='submit'>
              Login
            </button>
            } 
          </div>
        </Form>
        </div>
      </div>
    
    </>
  );
};

export default Login;
