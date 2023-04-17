import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
function ResetPassword() {
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    const back=()=>{
        navigate('/login')
    }
  return (
    <div>
    
      <div className="mb-3 row">
          <label htmlfor="Email" className="col-sm-2 col-form-label">name</label>
          <div className="col-sm-10">
            <input type="text"className="form-control" id="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
          </div>
        </div>
        <button type="button" class="offset-4 btn btn-primary" >send otp</button>
        <button type="button" class="offset-4 btn btn-primary" onClick={back}>back</button>
    </div>
  )
}

export default ResetPassword
