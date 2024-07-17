import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const UpdateProduct = () => {

    const productId = useParams().id;
    console.log(productId);
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [pprice, setPprice] = useState('');
    const [pcat, setPcat] = useState('');
    const [pimage, setPimage] = useState('');



    useEffect(() => {
        const getDetails = async () => {
            try {
                console.log("hello");
                const { data } = await axios.get('/product-detail/' + productId);
                const info = data.data[0];
                console.log(info);
                setPname(info.pname);
                setPdesc(info.pdesc);
                setPprice(info.pprice);
                setPcat(info.pcat);
                setPimage(info.pimage);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        getDetails();
    }, []);


    //getData();





    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(pname);
        const { data } = await axios.post('/update-product', {

            pname: pname,
            pdesc: pdesc,
            pprice: pprice,
            pcat: pcat,
            pimage: pimage,
            id: productId

        })

        if (data.success) {
            alert("product updated successfully!");
            navigate('/my-products')

        }

        else {
            alert(data.message);
        }


    }

    const navigate = useNavigate();




    return (
        <div>

            <h1>Update your Product Here!</h1>

            <form onSubmit={submitHandler} >
                <div class="form-group">
                    <label for="exampleInputEmail1">Product Name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={pname} onChange={(e) => { setPname(e.target.value) }} />

                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Product Description</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={pdesc} onChange={(e) => { setPdesc(e.target.value) }} />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Product Price</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={pprice} onChange={(e) => { setPprice(e.target.value) }} />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Product Category</label>
                    <select value={pcat} onChange={(e) => { setPcat(e.target.value) }}>
                        <option >Books</option>
                        <option >Mattresses</option>
                        <option >Electronics</option>
                        <option >Models</option>
                        <option>Others</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Product Image</label>
                    <input type="file" class="form-control" onChange={(e) => { setPimage(e.target.files[0]) }} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateProduct