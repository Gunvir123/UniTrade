// import React, { useEffect, useState } from 'react'
// import { useParams } from "react-router-dom"
// import axios from 'axios';
// const ProductDetail = () => {

//     const productId = useParams().id;
//     // console.log(productId);
//     const [product, setProduct] = useState();
//     useEffect(() => {
//         const getDetails = async () => {

//             const { data } = await axios.get('/product-detail/' + productId);
//             setProduct(data.data[0])
//             // console.log(data.data);
//         }

//         getDetails();


//     }, []);

//     const [user, setUser] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobile, setMobile] = useState('');

//     const handleContact = async (id) => {
//         console.log(id);
//         const { data } = await axios.post('/get-contact', { id: id });
//         const res = data.data[0];
//         console.log(res);
//         const user = res.username;
//         const email = res.email;
//         const mobile = res.mobile;
//         console.log(user);
//         setUser(user);
//         setEmail(email);
//         setMobile(mobile);

//     }





//     return (
//         <div>
//             <h2 className='mt-4 mx-3'>PRODUCT DETAILS HERE:-</h2>
//             <div>
//                 {product && <div className='d-flex justify-content-between flex-wrap'>
//                     <div>
//                         <img src={"http://localhost:8081/" + product.pimage} alt="" height="500px" width="800px" />
//                         <br />
//                         <h4 className='mt-2'>Description:-</h4>
//                         <div>{product.pdesc}</div>
//                     </div>
//                     <div className='ms-2'>
//                         <div>{product.pname} | {product.pcat}</div>
//                         <h3>Rs.{product.pprice}/-</h3>
//                         <br /><br />
//                         <button onClick={() => { handleContact(product.addedBy) }}>SHOW CONTACT DETAILS</button>
//                         <br />
//                         {user && user}
//                         <br />
//                         {email && email}
//                         <br />
//                         {mobile && mobile}

//                     </div>
//                 </div>}
//             </div>
//         </div>
//     )
// }

// export default ProductDetail

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css'; // Import your CSS file for custom styling
import io from 'socket.io-client';
import image from '../assests/discussion-profile.png'


let socket;

const ProductDetail = () => {
    const productId = useParams().id;
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    useEffect(() => {
        const getDetails = async () => {
            try {
                const { data } = await axios.get('/product-detail/' + productId);
                setProduct(data.data[0]);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        getDetails();
    }, [productId]);


    const handleContact = async (id) => {
        try {
            const { data } = await axios.post('/get-contact', { id });
            const res = data.data[0];
            setUser(res.username);
            setEmail(res.email);
            setMobile(res.mobile);
        } catch (error) {
            console.error('Error fetching contact details:', error);
        }
    };
    const [msg, setmsg] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    useEffect(() => {
        socket = io('http://localhost:8081');
        socket.on('connect', () => {
            console.log('connection ');
        });
        socket.on('getMsg', (data) => {

            const _data = data.filter((item, index) => {
                return item.productId === productId
            })

            setAllMessages(_data);
            console.log('data received is ', data);
        })
    }, []);


    const handleSend = () => {
        const data = {
            username: localStorage.getItem("username"),
            msg,
            productId: productId
        }

        try {
            socket.emit('sendMsg', data);
            setmsg('');

        } catch (error) {
            console.log("error sending the data", error);
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Product Details</h2>
            {product && (
                <div className="row">
                    <div className="col-md-6">
                        <img src={`http://localhost:8081/${product.pimage}`} alt={product.pname} className="img-fluid product-image" />
                        <h4 className="mt-4">Description:</h4>
                        <p className="product-description">{product.pdesc}</p>
                    </div>
                    <div className="col-md-6">
                        <div className="product-details">
                            <h2 className="product-name">{product.pname} | {product.pcat}</h2>
                            <h3 className="product-price">Rs.{product.pprice}/-</h3>
                            <button className="btn btn-info btn-show-contact" onClick={() => handleContact(product.addedBy)}>Show Contact Details</button>
                            {user && <div className="contact-info">User: {user}</div>}
                            {email && <div className="contact-info">Email: {email}</div>}
                            {mobile && <div className="contact-info">Mobile: {mobile}</div>}
                        </div>
                    </div>


                </div>
            )}
            <hr />
            <div>
                <h4>Discussion</h4>
                <input type="text " value={msg} onChange={(e) => setmsg(e.target.value)} style={{ width: '60vw' }} /><button className='btn btn-success ' style={{ marginLeft: '20px' }} onClick={handleSend}>Send</button>
                {allMessages.map((item, index) => {
                    if (item.username === localStorage.getItem('username'))
                        return (<p><img src={image} height={'40px'} width={'40px'} alt="" ></img><b>You</b> : {item.msg}</p>);
                    else {
                        return (<p><img src={image} alt="" height={'40px'} width={'40px'} ></img><b>{item.username}</b> : {item.msg}</p>);
                    }
                })}

            </div>
        </div>
    );
};

export default ProductDetail;
