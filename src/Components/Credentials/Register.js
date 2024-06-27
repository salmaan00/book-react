import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() { 
    const[formdata, setFormData] = useState({})
    const navigate=useNavigate()
    const handleInput = (e)=>{
        const{name, value}= e.target;
        setFormData({
            ...formdata,
            [name]:value,
        })
    }

    const checkValidation = ()=>{
        const requiredField = ['admin_name', 'mail' , 'username', 'password', 'con_password']
        for(const field of requiredField){
            if(!formdata[field]){
                toast.warning(`${field.replace('_','')}is required`,{
                    position: toast.POSITION.TOP_CENTER,
                    theme:'colored',

                });
                return false
                
            }
        }
        const emailRegax = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegax.test(formdata.mail.toLowerCase())){
            toast.warning("Please Enter Valid Mail Id",{
                position: toast.POSITION.TOP_CENTER,
                theme:'colored',

            });
            return false;

        }

        if(formdata.password !== formdata.con_password){
            toast.warning("Password Not Matching",{
                position: toast.POSITION.TOP_CENTER,
                theme:'colored',

            });
        }
        return true;
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("Enterd Value is ", formdata)
        if(!checkValidation()){
            return;
        }

        try{

          const response =  await axios.post('http://127.0.0.1:8000/users/',formdata,{
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json',
                }

            })

            if (response.status == 201){
                toast.success("Admin Inserted Successful",{
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
                })
            }

            navigate('/')


        }catch(error){
            console.log("error occured")
            toast.error("Admin Not Inserted Successful",{
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
                })

        }
    }



  return (
    <>
    <h2 className='text-center'>Admin Registration</h2>

    <div className='container' style={{width:'30%',marginBottom: 50}}>
        <form onSubmit={handleSubmit}>
            <div className='form-group p-3'>
                <label>Admin Name</label>
                <input type='text' name='admin_name' className="form-control" onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Admin Mail Id</label>
                <input type='text' name='mail' className="form-control"onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Username</label>
                <input type='text' name='username' className="form-control" onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Password</label>
                <input type='text' name='password' className="form-control" onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Confirm Password</label>
                <input type='text' name='con_password' className="form-control" onChange={handleInput}></input>
            </div>
            <button type='submit' className='btn btn-primary' style={{marginBottom:20,marginLeft:100}}>Submit</button>
        </form>
    </div>
    
    </>
  )
}
