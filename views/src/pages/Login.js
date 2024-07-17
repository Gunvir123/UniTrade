import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email: email,
                password: password
            });

            console.log(data.success);
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("userId", data.id);
                alert("user logged in!");
                navigate('/dash');
            }
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register-page text-center'>
            <div className='head'>Login Page</div>
            <form onSubmit={submitHandler}>
                {/* <div class="form-group">

                    <input type="text" class="form-control" id="name" placeholder="Your Name" value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div> */}
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
                <div className='register-button'>
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>


            </form>
            <div className='routed-path'>Not registered yet?
                <button><a href="/register">Register</a></button>
            </div>

        </div>
    )
}

export default Login;