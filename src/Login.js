import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from './config'

function Login() {
    const navigate = useNavigate()
    const loginForm = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit :async (values) =>{
// console.log(values)
try {
   const user = await axios.post(`${config.api}/user/login`,values)
   localStorage.setItem("myreact",user.data.token)
   if(user.data.message === "success"){
    navigate("/product")
   }
}catch (error){
    alert(error.response.data.message )

}
        }
    })
  return (
    <div className="container">
       <form onSubmit={loginForm.handleSubmit}>
       <div className='row'>
            <div className='col-lg-12 form-group'>
                <label>E-MAIL</label>
                <input 
                name="email"
                 onChange={loginForm.handleChange}
                value={loginForm.values.email}
                 className='form-control' type={"email"}/>
            </div>
            <div className='col-lg-12 form-group'>
                <label>PASSWORD</label>
                <input 
                 name="password"
                 onChange={loginForm.handleChange}
                value={loginForm.values.password} className='form-control' type={"password"}/>
            </div>
            <div className='col-lg-12 form-grou mt-2'>
                <input className='btn btn-primary' type={"submit"}/>
            </div>
            <div style={{marginTop:"20px",opacity:"50%"}}>
            <h6><b>Email : </b>user1@gmail.com   &nbsp; &nbsp; <b>password : </b>admin321</h6>

            </div>

        </div>
       </form>
    </div>
  )
}

export default Login