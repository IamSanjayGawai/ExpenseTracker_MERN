import React from 'react'
import {Form, Input} from 'antd';
import {Link} from 'react-router-dom'
const Login = () => {

    
    // form submit   antd takes values insted of events
const submitHandler = (values) => {
    console.log(values)
}

  return (
    <>
      <div className='register-page'>
       <Form layout='vertical' onFinish={submitHandler}> 
       <h1>Login</h1>
        <Form.Item label='Email' name='email'>
            <Input  placeholder='Enter your email' />
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input  placeholder='Enter your password' />
        </Form.Item>
        <div className='d-flex justify-conten-between'>
            <Link to='/register'>Not a User? Click Here to Register </Link>
            <button className='btn btn-primary'>Login</button>

        </div>
       </Form>
     </div>   
    </>
  )
}

export default Login