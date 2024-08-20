---

# E-commerce App

This is a full-stack E-commerce application built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**. The application allows users to browse products, add them to their cart, and proceed to checkout. Admins can manage products, view orders, and control the platform's product listings.

## Live Demo

Explore the live application here: [E-Commerce App](https://ecommerce-project-ashishnautiyal.onrender.com)
## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can sign up, log in, and manage their profiles.
- **Product Listings:** View a variety of products with detailed descriptions, prices, and images.
- **Shopping Cart:** Add items to the cart and adjust the quantity before proceeding to checkout.
- **Order Management:** Users can review and track their orders. Admins can view and update orders.
- **Admin Panel:** Admins have access to add, edit, and delete products.
- **Responsive Design:** The app is optimized for different screen sizes and devices.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## Usage

- **Users:**
  - Sign up or log in.
  - Browse and search for products.
  - Add items to the cart and proceed to checkout.
  - Track their orders.

- **Admin:**
  - Access the admin panel.
  - Add, edit, and delete products.
  - View and update orders.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB with Mongoose
- **Others:** BCrypt for password hashing, dotenv for environment variables

## Project Structure

```
ecommerce-app/
│
├── controllers/          # Controllers for handling requests
├── models/               # Mongoose models for MongoDB collections
├── routes/               # Application routes
├── views/                # EJS templates for frontend views
├── public/               # Static files (CSS, JS, images)
├── .env                  # Environment variables
├── app.js                # Main application file
├── package.json          # Project metadata and dependencies
└── README.md             # Project README file
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License.

---
