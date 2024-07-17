const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


const addProductController = async (req, res) => {


    try {

        const pname = req.body.pname;
        const pdesc = req.body.pdesc;
        const pprice = req.body.pprice;
        const pcat = req.body.pcat;
        const pimage = req.file.path;
        const addedBy = req.body.userId
        // console.log(data);
        // console.log(req.file.path);
        //console.log(req.body.pcat);

        const newProduct = new productModel({ pname, pdesc, pprice, pcat, pimage, addedBy });
        await newProduct.save();
        console.log(newProduct);

        // console.log(data);
        res.json({
            message: "data added successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "some server error",
            success: false
        })
    }


}

const getProductController = async (req, res) => {
    try {
        const catName = req.query.catName;
        console.log(catName);
        let data;
        if (catName)
            data = await productModel.find({ pcat: catName });
        else
            data = await productModel.find({});

        if (data) {
            res.json({
                message: "Found successfully",
                success: true,
                data: data
            })
        }
        else {
            res.json({
                message: "No products found....",
                success: false
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "some error occured!",
            success: false
        })
    }
}

const likedProductController = async (req, res) => {
    try {
        const productId = req.body.productId;
        const userId = req.body.userId;
        console.log(productId);
        console.log(userId);
        const data = await userModel.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } });
        return res.json({
            message: "Product added to wishlist",
            success: true,
            data: data
        })

    } catch (error) {
        res.json({
            message: "some error occured",
            success: false
        })
    }

}

const getLikedProducts = async (req, res) => {
    const userId = req.body.userId;

    const data = await userModel.findOne({ _id: userId }).populate("likedProducts");

    return res.json({
        data: data.likedProducts,
        message: "Found results"
    })


}

const productDetail = async (req, res) => {
    const productId = req.params.id;

    console.log(productId);
    const data = await productModel.find({ _id: productId });

    res.json({
        data: data,
        message: "details found successfully"
    })
}

const getMyProducts = async (req, res) => {
    const userId = req.body.userId;

    const data = await productModel.find({ addedBy: userId })
    console.log(data);

    return res.json({
        data: data,
        message: "Found results"
    })


}

const deleteProduct = async (req, res) => {
    const productId = req.body.id;
    console.log(productId);

    const data = await productModel.deleteOne({ _id: productId })
    console.log(data);

    return res.json({
        data: data,
        message: "Found results"
    })


}

const updateProduct = async (req, res) => {
    try {
        console.log(req.body);
        const pname = req.body.pname;
        console.log(pname);
        const pdesc = req.body.pdesc;
        const pprice = req.body.pprice;
        const pcat = req.body.pcat;
        const id = req.body.id;
        //const pimage = req.file.path;
        //const addedBy = req.body.userId
        // console.log(data);
        // console.log(req.file.path);
        //console.log(req.body.pcat);
        console.log(id);
        const data = await productModel.updateOne({ _id: id }, { $set: { pname: pname, pdesc: pdesc, pprice: pprice, pcat: pcat } });
        console.log(data);
        //await newProduct.save();
        //console.log(newProduct);

        // console.log(data);
        res.json({
            message: "data updated successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "some server error",
            success: false
        })
    }

}

const dislikedProductController = async (req, res) => {
    try {
        const productId = req.body.productId;
        const userId = req.body.userId;
        console.log(productId);
        console.log(userId);
        const data = await userModel.updateOne({ _id: userId }, { $pull: { likedProducts: productId } });
        return res.json({
            message: "Product removed from wishlist",
            success: true,
            data: data
        })

    } catch (error) {
        res.json({
            message: "some error occured",
            success: false
        })
    }

}

module.exports = { addProductController, getProductController, likedProductController, getLikedProducts, productDetail, getMyProducts, deleteProduct, updateProduct, dislikedProductController };

