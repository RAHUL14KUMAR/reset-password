import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import Password from './PasswordForm';

function ResetPassword() {
    const [email,setEmail]=useState("");
    const [otpForm,setOtpForm]=useState(true);

    const navigate=useNavigate();
    const back=()=>{
        navigate('/login')
    }
    const send=async()=>{
      if(true){
        let url="http://localhost:3002/upload/emailsend"
        let options={
          method:'POST',
          url:url,
          headers:{
  
          },
          data:{email}
        }
        try{
          let res=await axios(options)
          console.log(res);
          if(res.status===200){
            toast.success(res.data.message);
            setTimeout(()=>{
              setOtpForm(false);
            },5000)
          }
        }catch(err){
          console.log(err);
          toast.error("email not found");
        }
  
      }else{
        toast.error('invalid');
      }
    }
  return (
    <div>
      {
        otpForm?<div>
        <ToastContainer/>
  
        
          <div className="mb-3 row">
            <label htmlfor="Email" className="col-sm-2 col-form-label">email</label>
            <div className="col-sm-10">
              <input type="email"className="form-control" id="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>  
            </div>
          </div>
          <button type="button" class="offset-4 btn btn-primary"onClick={send} >send otp</button>
          <button type="button" class="offset-4 btn btn-primary" onClick={back}>back</button>
  
        </div>:<Password email={email}/>
      }
      
    </div>
  )
}

export default ResetPassword
