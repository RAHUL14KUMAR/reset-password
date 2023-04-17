import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
function Home() {
  const navigate=useNavigate();
  const [info,setInfo]=useState({
    name:'',
    email:'',
    phone:''
  });
  useEffect(()=>{
    getData()
  },[])
  const getData=async()=>{
    let url="http://localhost:3000/upload/list"
    let options={
      method:'GET',
      url:url,
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    }
    try{
      let res=await axios(options)
      console.log(res);
      console.log(res.data);
      console.log(res.data.data)
      console.log(res.data.data[0].name)
      setInfo({
        name:res.data.data[0].name,
        email:res.data.data[0].email,
        phone:res.data.data[0].phone
      })
    }catch(err){
      navigate('/login');
    }
  }
  const logout=()=>{
    
  }
  return (
    <div>
      <ToastContainer/>
      <div class="container">
        <div classname='row login homepage'>
          <h3 classname='heading'>welcome</h3>
          <div class='col-md-7'>
            <img src="https://th.bing.com/th/id/OIP.EK9ofoIEind_Lzkl93VVTQHaJw?w=186&h=246&c=7&r=0&o=5&dpr=1.3&pid=1.7" width='240' height='200'/>
          </div>
          <div class='col-md-7'>
            <table classname='table'>
              <tbody>
                <tr>
                  <th width='50%'>Name</th>
                  <th width='50%'>{info.name}</th>
                </tr>
                <tr>
                  <th width='50%'>Email</th>
                  <th width='50%'>{info.email}</th>
                </tr>
                <tr>
                  <th width='50%'>Phone</th>
                  <th width='50%'>{info.phone}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button type="button" class="offset-4 btn btn-primary" onClick={logout} >logout</button>
    </div>
  )
}

export default Home
