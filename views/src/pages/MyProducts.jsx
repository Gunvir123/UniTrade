import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
const MyProducts = () => {

    const [products, setProducts] = useState([]);


    const likeHandler = async (productId) => {
        const userId = localStorage.getItem("userId");

        const { data } = await axios.post('/liked-products', { userId: userId, productId: productId });
        console.log(data);
        alert(data.message);


    }


    const navigate = useNavigate();
    const handleProduct = (id) => {
        navigate('/product-detail/' + id);
    }



    useEffect(() => {
        const getProducts = async () => {
            try {

                const userId = localStorage.getItem("userId");

                const { data } = await axios.post('/my-products', {

                    userId: userId

                });
                console.log(data.data);
                setProducts(data.data);
                //console.log(`products length is ${products.length}`);

            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    const deleteProduct = async (id) => {
        console.log(id);
        await axios.post('/delete-my-product', { id: id });
        alert("product deleted succesfully");
        navigate('/my-products');
    }

    const updateProduct = (id) => {

        navigate('/update-product/' + id);
    }



    return (
        <div>
            <h1>MY ADDED PRODUCTS:-</h1>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    {products && products.length > 0 && products.map((item, index) => (
                        <div key={item._id} className='col-lg-3 col-md-4 col-sm-6 mb-4' >
                            <div className='card h-100'>
                                <FaHeart className='wishlist' onClick={() => { likeHandler(item._id) }} />
                                <img src={"http://localhost:8081/" + item.pimage} alt="" className='card-img-top img-fluid card-image' onClick={() => handleProduct(item._id)} />
                                <div className='card-body d-flex flex-column'>
                                    <p className='card-text'>{item.pname} | {item.pcat}</p>
                                    <p className='card-text'>{item.pdesc}</p>
                                    <h3>{item.pprice}</h3>
                                    <button onClick={() => deleteProduct(item._id)}>delete</button>
                                    <button onClick={() => updateProduct(item._id)}>update</button>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyProducts