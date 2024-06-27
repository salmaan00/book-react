import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Creates() {
    const[formData, setFormData]=useState({})

    const handleInput = (e)=>{
        const{name, value}= e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("Entered value is", formData)

        try{
            const response = await axios.post('http://127.0.0.1:8000/books/',formData,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                }

            })

            if (response.status == 201){
                toast.success("Book Deteails Inserted Succesfully",{
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                })
            }
        }catch(error){
            console.log("Error occured")
        }
    }

  return (
    <>
     <div className='container' style={{width:'30%',marginBottom: 50}}>
        <form onSubmit={handleSubmit}>
            <div className='form-group p-3'>
                <label>Book Title</label>
                <input type='text' name='title' className="form-control" onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Book Author</label>
                <input type='text' name='author' className="form-control"onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Book Isbn  </label>
                <input type='text' name='isbn' className="form-control" onChange={handleInput}></input>
            </div>
            <div className='form-group p-3'>
                <label>Book Price</label>
                <input type='number' name='price' className="form-control" onChange={handleInput}></input>
            </div>
            <button type='submit' className='btn btn-primary' style={{marginBottom:20,marginLeft:100}}>Submit</button>
        </form>
    </div>
    
    
    
    
    </>
  )
}
