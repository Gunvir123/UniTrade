// import './App.css';
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import LikedProducts from './pages/LikedProducts';
import ProductDetail from './pages/ProductDetail';
import CategoriesPages from './pages/CategoriesPages';
import MyProducts from './pages/MyProducts';
import MyProfile from './pages/MyProfile';
import UpdateProduct from './pages/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <Header />
          } />

          <Route path="/add-product" element={
            <AddProduct />
          } />

          <Route path='/category/:catName' element={
            <CategoriesPages />
          } />


          <Route path='/register' element={
            <Register />
          } />

          <Route path='/login' element={
            <Login />
          } />



          <Route path='/liked-products' element={
            <LikedProducts />
          } />

          <Route path='/product-detail/:id' element={
            <ProductDetail />
          } />

          <Route path='/my-products' element={
            <MyProducts />
          } />

          <Route path='/my-profile' element={
            <MyProfile />
          } />
          <Route path='/update-product/:id' element={
            <UpdateProduct />
          } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
