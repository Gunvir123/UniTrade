const express = require("express");
const { registerController, loginController, getContactDetails, myProfile } = require("./controllers/userController");
const { addProductController, getProductController, likedProductController, getLikedProducts, productDetail, getMyProducts, deleteProduct, updateProduct, dislikedProductController } = require("./controllers/productController");
const connectDb = require("./models/db");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
// const { default: App } = require("./views/src/App");

//creating app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));


//multer to store images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

//apis
app.post('/register', registerController);
app.post('/login', loginController);
app.post('/add-product', upload.single("pimage"), addProductController);
app.get('/get-product', getProductController);
app.post('/liked-products', likedProductController);
app.post('/disliked-products', dislikedProductController);
app.post('/get-liked-products', getLikedProducts);
app.get('/product-detail/:id', productDetail);
app.post('/get-contact', getContactDetails);
app.post('/my-products', getMyProducts);
app.post('/my-profile', myProfile);
app.post('/delete-my-product', deleteProduct);
app.post('/update-product', updateProduct);




//mongodb connection
connectDb();

app.listen(8081, () => {
    console.log("hello");
})