import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faUser} from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap';
import swal from 'sweetalert'
import './account_list.style.css';
const AccountList = () => {
    const [users, setUser] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/admin/user-list');
                setUser(response.data.userList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
// console.log(users)
    const handleDelete = async (e, id) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3001/api/v1/admin/delete-user/${id}`)
            setUser(prevUsers => prevUsers.filter(user => user._id !== 
                id)); 
            swal({
                title: "Deleted successfully",
                icon: 'success',
            })
        } catch (error) {
            console.log("Error in handleDelete func", error)
            swal({
                title: 'An error occurred while processing your request.',
                icon: 'warning',
                dangerMode: true,            
            })
        }
    }
    return (
        <div >
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th>
                                    <FontAwesomeIcon className='icon' icon={faUser} color='#000' style={{alignSelf: 'center'}}/>
                                </th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{user.phone_number}</th>
                                <th>
                                    <button className='button-container' onClick={(e) => handleDelete(e, user._id)}>
                                        <FontAwesomeIcon className='icon-buton' icon={faTrash} color='#000'/>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </div>
    );
};
export default AccountList;
