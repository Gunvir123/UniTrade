import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddProduct = () => {



    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [pprice, setPprice] = useState('');
    const [pcat, setPcat] = useState('');
    const [pimage, setPimage] = useState('');

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/add-product', {
            pname: pname,
            pdesc: pdesc,
            pprice: pprice,
            pcat: pcat,
            pimage: pimage,
            userId: userId
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (data.success) {
            alert("product added successfully!")
            navigate('/');
        }

        else {
            alert(data.message);
        }


    }



    return (
        <div>

            <h1>Add your Product Here!</h1>

            <form onSubmit={submitHandler}>
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

export default AddProduct