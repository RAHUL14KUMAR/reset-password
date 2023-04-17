import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify';

function Registeration() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");

  const [errField,setErrField]=useState({
    nameErr:'',
    emailErr:'',
    phone:'',
    password:''
  })
  const navigate=useNavigate();

  const submit=async()=>{
    if(true){
      let url="http://localhost:3000/upload/add"
      let options={
        method:'POST',
        url:url,
        headers:{

        },
        data:{name,email,phone,password}
      }
      console.log(options);
      try{
        let res=await axios(options)
        console.log(res);
        if(res.status===200){
          // console.log("added")
          toast.success("user added successfully!");
          setTimeout(()=>{
            navigate('/login')
          },2500)
        }
      }catch(err){
        toast.error("something went wrong");
      }
    }else{
      toast.error("invalid");
    }
  }
  const nav=()=>{
    navigate('/login');
  }
  // const validate=()=>{
  //   let valid=true;
  //   setErrField({
  //     nameErr:'',
  //     emailErr:'',
  //     phone:'',
  //     password:''
  //   })
  //   if(name==''){
  //     valid=false;
  //     setErrField(prevState=>({
  //       ...prevState,nameErr:"please enter the name"
  //     }))
  //   }
  // }
  return (
    <div>
      <ToastContainer/>
        <div className="mb-3 row">
          <label htmlfor="Email" className="col-sm-2 col-form-label">name</label>
          <div className="col-sm-10">
            <input type="text"className="form-control" id="Email" value={name} onChange={(e)=>setName(e.target.value)}/>
            {/* {
              errField.nameErr.length>0&&<span className="error">{errField.nameErr}</span>
            } */}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlfor="inputPassword" className="col-sm-2 col-form-label">email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputPassword" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlfor="inputPasswor" className="col-sm-2 col-form-label">Phone</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="inputPasswor" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlfor="inputPasswo" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPasswo" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
        </div>
        <button type="button" className="offset-4 btn btn-primary" onClick={submit}>add</button>
        <button type="button" className="offset-4 btn btn-primary" onClick={nav}>login</button>
    </div>
  )
}

export default Registeration
