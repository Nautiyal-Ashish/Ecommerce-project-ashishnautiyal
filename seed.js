const mongoose = require('mongoose');
const Product = require('./models/Product');



const products = [
    {
        name: "Iphone 14Pro",
        img: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 130000,
        desc: "Very Costly , aukaat se bhaar"
    },
    {
        name: "Macbook M2 Pro",
        img: "https://plus.unsplash.com/premium_photo-1681666713728-9ed75e148617?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 250000,
        desc: "Bilkul Aukkat se Bhar"
    },
    {
        name: "Apple Watch",
        img: "https://images.unsplash.com/photo-1642101373432-a9c683c34902?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 34000,
        desc: "ye sasta hai lelo"
    },
    {
        name: "Ipad Pro",
        img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 80000,
        desc: "Ye show off ka item hai"
    },
    {
        name: "Airpods",
        img: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D",
        price: 25000,
        desc: "Badhiya hai kamao kamao"
    }
]


async function seedDB() {
    await Product.insertMany(products);
    console.log("Data Seeded Successfully");
}

module.exports = seedDB;