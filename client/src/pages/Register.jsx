import React from 'react'
import {Form, Input} from 'antd';
import {Link} from 'react-router-dom'
i

const Register = () => {

    // form submit   antd takes values insted of events
const submitHandler = (values) => {
    console.log(values)
}


  return (
    <>
    <div className='register-page'>
       <Form layout='vertical' onFinish={submitHandler}> 
       <h1>Register</h1>
        <Form.Item label='Name' name='name'>
            <Input  placeholder='Enter your name' />
        </Form.Item>
        <Form.Item label='Email' name='email'>
            <Input  placeholder='Enter your email' />
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input  placeholder='Enter your password' />
        </Form.Item>
        <div className='d-flex justify-conten-between'>
            <Link to='/login'>Already Register? Click Here to Login </Link>
            <button className='btn btn-primary'>Register</button>

        </div>
       </Form>
     </div>   
    </>
  )
}

export default Register