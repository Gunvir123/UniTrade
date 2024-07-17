import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import '../components/Header.css'
import categories from '../components/CategoriesList';
import { FaHeart } from "react-icons/fa";
import profile from '../profile.webp'
import { RiSearchFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
const CategoriesPages = () => {

    const navigate = useNavigate();

    const param = useParams();
    console.log(param);

    //logout functionality
    const clickHandler = () => {
        const val = window.confirm("are you sure you want to log out");
        if (val) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
        }
    }

    //immedialtely protects this route....

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    //getting the data immediatily on visitig home page

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await axios.get('/get-product?catName=' + param.catName);
            setProducts(data.data);
            setOriginalProducts(data.data);
        }
        fetchData();
    }, [param])

    //search functionality

    const [search, setSearch] = useState('');

    const handleClick = () => {
        console.log('products', products);
        let filteredProducts = originalProducts.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.pcat.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })

        console.log(filteredProducts);

        setProducts(filteredProducts);
    }

    const handleChange = (value) => {
        navigate('/category/' + value);
        console.log('products', products);
        let filteredProducts = originalProducts.filter((item) => {
            if (item.pcat.toLowerCase() == value.toLowerCase()) {
                return item;
            }
        })

        console.log(filteredProducts);

        setProducts(filteredProducts);
    }

    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, [])




    const likeHandler = async (productId) => {
        const userId = localStorage.getItem("userId");

        const { data } = await axios.post('/liked-products', { userId: userId, productId: productId });
        console.log(data);
        alert(data.message);
        // setToggle(!toggle);

    }

    const handleProduct = (id) => {
        navigate('/product-detail/' + id);
    }

    const [showOver, setShowOver] = useState(false);

    const handleHomeClick = () => {
        navigate('/')
    };



    return (
        <>


            {/* <div>Header</div> */}
            {/* <p>Welcome,{username}</p> */}


            <input type="text" placeholder='Search for Books, Electronics, Mattresses, Bags, etc..' value={search} onChange={(e) => { setSearch(e.target.value) }} className={search === 'Search for Books, Electronics, Mattresses, Bags, etc..' ? 'search-bar default-text' : 'search-bar'} />

            <RiSearchFill onClick={handleClick} className='search-icon' />
            <FaHome onClick={handleHomeClick} className='home-icon' />






            <img src={profile} width="45px" height="45px" alt="" className='profile' onClick={() => { setShowOver(!showOver) }} />
            {/* profile section */}
            {showOver && <div> <div className='profile-bar'>
                <div><Link to="/my-profile" style={{ color: 'white', textDecoration: 'none' }} >Profile</Link></div>
                {/* <div style={{ color: 'black' }} onClick={() => navigate('/add-product')}>Add Product</div> */}
                <div><Link to="/add-product" style={{ color: 'white', textDecoration: 'none' }}>Add Product</Link></div>
                <div><Link to="/liked-products" style={{ color: 'white', textDecoration: 'none' }} >Wishlisted items</Link></div>
                <div><Link to="/my-products" style={{ color: 'white', textDecoration: 'none' }} >My Products</Link></div>
                {!localStorage.getItem('token') ? <Link to='/login'>Login</Link> : <div onClick={clickHandler} style={{ cursor: 'pointer' }}>Logout</div>}

            </div>
            </div>}
            <br />
            {/* <span className='p-3 navbar'>All Categories</span>
            {categories && categories.length > 0 && categories.map((item, index) => {
                return (
                    <button className='p-3 m-2 navbar-button' onClick={() => { handleChange(item) }} >{item}</button>

                )
            })} */}
            <div className="navbar">
                <ul className="category-list">

                    <li onClick={() => { navigate('/') }}>All Categories</li>

                    {categories && categories.length > 0 && categories.map((item, index) => (
                        <li key={index} onClick={() => handleChange(item)}>{item}</li>
                    ))}
                </ul>
            </div>


            {/* {products && products.length > 0 && <h2 className='mt-5'></h2>} */}
            {products && products.length == 0 && <h2 className='mt-5'>No Results</h2>}








            {/* <div className='d-flex justify-content-center flex-wrap' >
                {products && products.length > 0 && products.map((item, index) => {
                    return (
                        <div key={item._id} className='card m-2' onClick={() => handleProduct(item._id)}>
                            <FaHeart className='wishlist' onClick={() => { likeHandler(item._id) }} />
                            <img src={"http://localhost:8081/" + item.pimage} alt="" height="400px" width="500px" />
                            <p className='p-2'>{item.pname}|{item.pcat}</p>
                            <p className='p-2'>{item.pdesc}</p>
                            <h3>{item.pprice}</h3>


                        </div>
                    )
                })}

            </div> */}

            <div className='container-fluid  ' style={{ marginTop: '85px' }}>
                <div className='row justify-content-center'>
                    {products && products.length > 0 && products.map((item, index) => (
                        <div key={item._id} className='col-lg-3 col-md-4 col-sm-6 mb-4' onClick={() => handleProduct(item._id)}>
                            <div className='card h-100'>
                                <FaHeart className='wishlist' onClick={() => { likeHandler(item._id) }} />
                                <img src={"http://localhost:8081/" + item.pimage} alt="" className='card-img-top img-fluid card-image' />
                                <div className='card-body d-flex flex-column'>
                                    <p className='card-text'>{item.pname} | {item.pcat}</p>
                                    <p className='card-text'>{item.pdesc}</p>
                                    <h3>{item.pprice}</h3>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </>
    )
}

export default CategoriesPages;