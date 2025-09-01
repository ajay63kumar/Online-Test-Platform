import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ApiService from "../service/ApiService"
import "../style/login.css"

const LoginPage = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");  
  const navigate = useNavigate(); 

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      const loginData ={ email,password};
      const res = await ApiService.loginUser(loginData);

      if(res.status === 200){
        ApiService.saveToken(res.token);
        ApiService.saveRole(res.role);

        setMessage(res.message);

        if (res.role === "ADMIN") {
          navigate("/admin");   // ✅ goes to AdminDashboard
        } else if (res.role === "TEACHER") {
          navigate("/teacher"); // ✅ goes to TeacherDashboard
        } else {
          navigate("/homepage"); // ✅ goes to HomePage
        }
      }
    }catch(error){
      showMessage(
        error.response?.data?.message || "Error logging in: " + error
      );
      console.log(error);
    }
  };

  const showMessage =(msg)=>{
    setMessage(msg);
    setTimeout(()=> setMessage(""),4000);
  }

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      {message && <p className='message'>{message}</p>}
      <form onSubmit={handleLogin} autoFocus>
        <input type='email'
          placeholder='Email'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          autoFocus
          required />
        
        <input type='password'
          placeholder='Password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required />

        <button type='submit'> Login </button>
      </form>
      <p>Don't have an account? <a href='/register'>Register</a></p>
    </div>
  )
}

export default LoginPage;



