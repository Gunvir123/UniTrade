import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data, message } = await axios.post('/register', {
                username: username,
                email: email,
                password: password,
                mobile: mobile
            });

            console.log(data.success);
            if (data.success) {
                alert("user signed up!");
                navigate('/login');
            }
            else {
                alert(message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register-page text-center '>
            <div className='head '>Register Page</div>
            <form onSubmit={submitHandler}>
                <div class="form-group">

                    <input type="text" class="form-control" id="name" placeholder="Your Name" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div class="form-group">

                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>
                <div class="form-group">

                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>

                <div class="form-group">

                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Mobile number" value={mobile} onChange={(e) => {
                        setMobile(e.target.value);
                    }} />
                </div>
                <div className='register-button'>
                    <button type="submit" class="btn btn-primary">Register</button>
                </div>



            </form>

            <div className='routed-path'>Already registered?
                <button><a href="/login">Login</a></button>
            </div>
        </div>
    )
}

export default Register;