const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51K4dslDNHFgI9Z1jBHgP6RyG3svV2OXW9B5q0yUuiGP1cwXlziRKOIcOGYgJYDrlqSnT4g4Ghfqh2iNqsPqBmqC900tz3Q1nqE');

//API

//APP config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//API routes
//app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log('Payment Request Received Amount is ', total);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    });
    //created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });

})
//Listen command
exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/clone-website-50073/us-central1/api