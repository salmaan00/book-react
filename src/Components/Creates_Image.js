import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Creates_Image() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setBookData({
            ...bookData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('isbn', bookData.isbn);
        formData.append('price', bookData.price);
        if (bookData.image) {
            formData.append('image', bookData.image);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/books/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Book Added Successfully', { position: toast.POSITION.TOP_CENTER, theme: 'colored' });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Book Title</label>
                    <input type='text' className='form-control' name='title' value={bookData.title} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Book Author</label>
                    <input type='text' className='form-control' name='author' value={bookData.author} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Book ISBN</label>
                    <input type='text' className='form-control' name='isbn' value={bookData.isbn} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Book Price</label>
                    <input type='text' className='form-control' name='price' value={bookData.price} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Book Image</label>
                    <input type='file' className='form-control' onChange={handleImageChange} />
                </div>
                <button type='submit' className='btn btn-primary mt-3'>Add Book</button>
            </form>
            <ToastContainer />
        </div>
    );
}
