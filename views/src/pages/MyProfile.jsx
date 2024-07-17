import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyProfile = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const getDetails = async () => {
        const { data } = await axios.post('/my-profile', { id: localStorage.getItem('userId') });
        setUsername(data.data[0].username);
        setEmail(data.data[0].email);
        setContact(data.data[0].mobile);
    }

    useEffect(() => { getDetails() }, []);


    return (
        <>
            <h2 className='text-center mt-2'>USER PROFILE</h2>

            <div className='mt-2 ml-5 mr-5'>

                <table className="table table-hover mt-5  ">
                    <thead>
                        <tr>

                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{contact}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </>

    )
}

export default MyProfile