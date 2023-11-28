import React, {useState} from 'react'
import {Form, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import SubmitSpinner from '../components/SubmitSpinner';



const Register = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // form submit   antd takes values insted of events
const submitHandler = async (values) => {
 try{
    setLoading(true)
     await axios.post('http://localhost:8080/api/v1/users/register', values)
     message.success('Registration Successfull')
    setLoading(false)
    navigate('/login')
 }
 catch(error){
    //  Message.error(error.response.data.message)
    setLoading(false)
    message.error("Something Went Wrong")
     

 }
}


  return (
    <>
<div className='register-page container-fluid d-flex justify-content-center'>
        <div className='row  d-flex justify-content-center' style={{height:'70%', width:'100%'}}>
       <Form layout='vertical' onFinish={submitHandler} className='col-12 col-sm-8 col-md-6 col-lg-4 p-5 bx-sd2' > 
       <h1>Register</h1>
        <Form.Item label='Name' name='name'>
            <Input  placeholder='Enter your name' required />
        </Form.Item>
        <Form.Item label='Email' name='email'>
            <Input  placeholder='Enter your email' required />
        </Form.Item>
        <Form.Item label='Password' name='password'>
            <Input  placeholder='Enter your password' required/>
        </Form.Item>
        <div className='d-flex justify-content-between'>
            <Link to='/login'>Already Register? Click Here to Login </Link>
            {
              loading ? <SubmitSpinner/> :
              <button className='btn btn-primary' htmlType='submit'>
              Register
            </button>
            } 

        </div>
       </Form>
       </div>
     </div>   
    </>
  )
}

export default Register