import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './MyProfile.css'
import image from '../assests/discussion-profile.png'
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

    const handleChange = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const { data } = await axios.patch('/my-profile', { userId, username, email, contact });
        console.log(data);
        if (data.success) {
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);
            alert('data updated successfully');


        }

        else {
            alert('error updating details ');
        }
    }


    return (
        <>
            <h3 className='text-center mt-2'>User Profile</h3>

            <img src={image} alt="" width={"150px"} height={"150px"} className='mt-3 text-center' style={{ marginLeft: '45vw' }} />

            <form style={{ width: '50vw', marginLeft: '30vw' }} className='profile-form' onSubmit={handleChange}>

                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" class="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />


                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Contact</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={contact} onChange={(e) => setContact(e.target.value)} />

                </div>


                <button type="submit" class="btn btn-danger" style={{ width: '60vw' }}>Save changes</button>
            </form>
        </>

    )
}

export default MyProfile