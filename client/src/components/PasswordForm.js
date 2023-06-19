import React,{useState} from 'react'
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

function PasswordForm(props) {
    const [email,setEmail]=useState(props);
    const [otp,setotp]=useState("");
    const [password,setPassword]=useState("");
    const [Confirmpassword,setConfirmPassword]=useState("");

    const navigate=useNavigate();
    const login=async()=>{
    if(true){
      let url="http://localhost:3002/upload/changepassword"
      let options={
        method:'POST',
        url:url,
        headers:{

        },
        data:{email,otp,password,Confirmpassword}
      }
      console.log(options);
      try{
        let res=await axios(options)
        console.log(res);
        // console.log(res.data.data.token);
        if(res.status===200){
          toast.success("user password changes successfully!");
        }
      }catch(err){
        console.log(err);
        toast.error("user not found");
      }

    }else{
      toast.error('invalid');
    }
  }
//   console.log(password);
  return (
    <div>
      <ToastContainer/>
      <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">OTP CODE</label>
    <div class="col-sm-10">
      <input type="Number" maxLength='4' class="form-control" id="inputPassword" value={otp} onChange={(e)=>setotp(e.target.value)} />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPasswo" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPasswo" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassw" class="col-sm-2 col-form-label">Confirm-Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassw" value={Confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
    </div>
  </div>
  <button type="button" class="offset-4 btn btn-primary" onClick={login}>change Password</button>
    </div>
  )
}

export default PasswordForm
