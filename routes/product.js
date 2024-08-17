const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
// we cannot use app here as app is a global instance and it can only be used once in the main app.js file , we also can't export app from app.js it is not allowed but we can use mini instance or a part of app ehich is router
const router = express.Router(); //mini instance 
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');

// to show all the main page
router.get('/main', async (req, res) => {
    try {
        res.render('main');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

// to show all the products
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


// to show the form for new product
router.get('/product/new', isLoggedIn, (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

// to actually add the product
router.post('/products', isLoggedIn, isSeller, validateProduct, async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc, author: req.user._id })
        req.flash('success', 'Product added succesfully')

        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


// to show a particular product
router.get('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg: req.flash('msg') })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


// form to edit the product
router.get('/products/:id/edit', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

// to actually edit the data in db
router.patch('/products/:id', isLoggedIn, validateProduct, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc })
        // flash
        req.flash('success', 'Product edited succesfully')

        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


// to delete a product
router.delete('/products/:id', isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findById(id);

        // this code is for when deleting the product we have to delete the reviews of that product also.
        // Note review pehle delte karna hai
        // this below can also written in schema (check)
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }

        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted succesfully')

        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


module.exports = router;