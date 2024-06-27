import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Creates_Image from './Creates_Image';

export default function Crud() {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState({});

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/books/')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    }, []);

    const updateDetails = (id) => {
        fetch(`http://127.0.0.1:8000/update/${id}`)
            .then(response => response.json())
            .then(res => setUpdate(res));
    };

    const handleInputChange = (event, fieldName) => {
        const value = event.target.value;

        setUpdate((prevUpdate) => ({
            ...prevUpdate,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const requestData = {
            id: update.id,
            title: update.title,
            author: update.author,
            isbn: update.isbn,
            price: update.price,
        };
        console.log("Updated Data:", requestData);
        await axios.put(`http://127.0.0.1:8000/update/${id}/`, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        toast.success("Book Update Successful", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
        });
    };

    const handleDelete = (id) => {
        fetch('http://127.0.0.1:8000/delete/' + id, { method: 'DELETE' })
            .then(() => {
                console.log("Deleted");
            });
        toast.error("Book Deleted", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
        });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [searchItem, setSearchItem] = useState('');

    const filterData = data.filter((item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    const recordPerPage = 3;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const records = filterData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prevPage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changePage = (id) => {
        setCurrentPage(id);
    };

    return (
        <>
            <div className='container-lg p-5 shadow'>
                <div className='row'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Search-Here'
                        style={{ width: 200 }}
                        value={searchItem}
                        onChange={(e) => {
                            setSearchItem(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">AUTHOR</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">PRICE</th>
                            <th scope='col'>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>
                                    <img src={item.image} alt={item.title} style={{ width: 100, borderRadius: "70%" }} />
                                    {item.title}
                                </td>
                                <td>{item.author}</td>
                                <td>{item.isbn}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => { updateDetails(item.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => { updateDetails(item.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" href="#" onClick={() => changePage(n)}>{n}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Modals for update button */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Modal</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <form onSubmit={(e) => handleSubmit(e, update.id)}>
                                    <div className='form-group'>
                                        <label>Title</label>
                                        <input type='text' className='form-control' value={update.title || ''} onChange={(event) => handleInputChange(event, 'title')} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Author</label>
                                        <input type='text' className='form-control' value={update.author || ''} onChange={(event) => handleInputChange(event, 'author')} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Isbn</label>
                                        <input type='text' className='form-control' value={update.isbn || ''} onChange={(event) => handleInputChange(event, 'isbn')} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Price</label>
                                        <input type='number' className='form-control' value={update.price || ''} onChange={(event) => handleInputChange(event, 'price')} />
                                    </div>
                                    <button type="Submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals for delete button */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Modal</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do You Want To Delete? <b>{update.title}</b></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(update.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
            <Creates_Image />
        </>
    );
}
