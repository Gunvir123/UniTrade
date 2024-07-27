import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import '../components/Header.css'
import { useNavigate } from 'react-router-dom';
const LikedProducts = () => {

    const [products, setProducts] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const likeHandler = async (productId) => {
        if (isLiked == false) {
            setIsLiked(true);
        }
        else {
            setIsLiked(false);
        }
        const userId = localStorage.getItem("userId");
        if (isLiked) {
            const { data } = await axios.post('/liked-products', { userId: userId, productId: productId });
            console.log(data);
            alert(data.message);
        }
        else {
            const { data } = await axios.post('/disliked-products', { userId: userId, productId: productId });
            console.log(data);
            alert(data.message);
            //navigate('/liked-products');
        }


    }

    useEffect(() => {
        const getProducts = async () => {
            try {

                const userId = localStorage.getItem("userId");

                const data = await axios.post('/get-liked-products', {

                    userId: userId

                });

                //console.log(data.data.data);
                setProducts(data.data.data);

            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    const handleProduct = (id) => {
        navigate('/product-detail/' + id);
    }



    return (
        <div>
            <h3 className='text-center mt-3'>YOUR LIKED PRODUCTS</h3>
            {/* <div className='d-flex justify-content-center flex-wrap'>
                {products.length > 0 && products.map((item, index) => {
                    return (
                        <div key={item._id} className='card m-2'>

                            <FaHeart className='wishlist' onClick={() => { likeHandler(item._id) }} />
                            <img src={"http://localhost:8081/" + item.pimage} alt="" height="400px" width="500px" />
                            <p className='p-2'>{item.pname}|{item.pcat}</p>
                            <p className='p-2'>{item.pdesc}</p>
                            <h3>{item.pprice}</h3>


                        </div>
                    )
                })}

            </div> */}

            <div className='container-fluid mt-3'>
                <div className='row justify-content-center'>
                    {products && products.length > 0 && products.map((item, index) => (
                        <div key={item._id} className='col-lg-3 col-md-4 col-sm-6 mb-4' onClick={() => handleProduct(item._id)}>
                            <div className='card h-100'>
                                <FaHeart className='wishlist' onClick={() => { likeHandler(item._id) }} />
                                <img src={"http://localhost:8081/" + item.pimage} alt="" className='card-img-top img-fluid card-image' />
                                <div className='card-body d-flex flex-column'>
                                    <p className='card-text'>{item.pname} | {item.pcat}</p>
                                    <p className='card-text'>{item.pdesc}</p>
                                    <h3>{item.pprice}/-</h3>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LikedProducts