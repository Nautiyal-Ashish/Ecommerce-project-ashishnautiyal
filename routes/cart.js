const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u')

// route to see the cart
router.get('/user/cart', isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart', { user })
})


// actually adding product to the cart
router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save()
    res.redirect('/user/cart');
})

// to delete a product from the cart



// payment integration
router.get('/checkout', async (req, res) => {
    let user = req.user;
    let products = await User.findById(req.user._id).populate('cart');
    const session = await stripe.checkout.sessions.create({
        line_items:
            Array.from(products.cart).map((items) => {
                return ({
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${items.name}`,
                        },
                        unit_amount: items.price * 100,
                    },
                    quantity: 1,
                });
            })
        ,
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
    });

    res.redirect(303, session.url);
});


module.exports = router;
