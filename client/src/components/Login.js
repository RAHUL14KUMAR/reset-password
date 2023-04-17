import React,{useState} from 'react'
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

  const nav=()=>{
    navigate('/register');
  }
  const login=async()=>{
    if(true){
      let url="http://localhost:3000/upload/login"
      let options={
        method:'POST',
        url:url,
        headers:{

        },
        data:{email,password}
      }
      try{
        let res=await axios(options)
        console.log(res);
        console.log(res.data.data.token);
        if(res.status===200){
          toast.success("user login successfully!");
          localStorage.setItem('token',res.data.data.token)
          setTimeout(()=>{
            navigate('/')
          },9000)
        }
      }catch(err){
        console.log(err);
        toast.error("user not found");
      }

    }else{
      toast.error('invalid');
    }
  }
  console.log(password);
  return (
    <div>
      <ToastContainer/>
      <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputPassword" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPasswo" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPasswo" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
  </div>
  <button type="button" class="offset-4 btn btn-primary" onClick={nav}>add</button>
  <button type="button" class="offset-4 btn btn-primary" onClick={login} >login</button>
    </div>
  )
}

export default Login
