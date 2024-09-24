# UniTrade

### Online Buy and Sell Platform

## Project Overview
UniTrade is an intuitive online marketplace where users can buy and sell items within specific categories. Designed to provide a smooth and secure platform for trading goods, it offers an engaging user interface and robust backend functionality. UniTrade ensures efficient item management, user interaction, and secure transactions.

## Features
- **Search and Filtering**: Users can search for items and apply filters based on categories to find exactly what they need.
- **Item Management**: Sellers can list and manage their items, while buyers can view and interact with available products.
- **Wishlist**: Users can add items to their wishlist for future consideration.
- **Discussion Forums**: A dedicated space for users to engage in discussions about items, reviews, or queries.
- **Authentication**: JWT-based authentication to ensure secure user sessions and data management.
  
## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites
Make sure you have the following installed on your local machine:
- Node.js
- MongoDB

### Steps to Install

1. Clone the repository:
    ```bash
    git clone https://github.com/Gunvir123/UniTrade.git
    ```

2. Navigate to the project directory:
    ```bash
    cd UniTrade
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

5. Create a `.env` file in the `backend` directory with the following environment variables:
    ```
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

6. Start the MongoDB server (if not running already):
    ```bash
    mongod
    ```

7. Start the backend server:
    ```bash
    cd backend
    npm run dev
    ```

8. Start the frontend:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage
Once the application is up and running:

1. **Visit the homepage** where you can view items available for sale.
2. **Search or filter items** based on categories of interest.
3. **Sign up** for an account to start listing items, manage your wishlist, or participate in discussions.
4. **Log in** to access additional features like item management and wishlists.
5. **Post items** for sale or manage existing listings through your account.


For any inquiries or feedback, feel free to reach out:
- **Gunvir Singh**  
  [Email](mailto:gunvirmittal@gmail.com)  
  [GitHub](https://github.com/Gunvir123)  
  [LinkedIn](https://www.linkedin.com/in/gunvir-singh-a18098281/)
