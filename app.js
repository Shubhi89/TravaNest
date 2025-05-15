const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/travanest');
}

app.use(express.urlencoded({ extended: true }));
app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname , "views"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// index route
app.get('/listings', async (req, res) => {
        const listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
});

// new route
app.get('/listings/new', (req, res) => {
    res.render("listings/new.ejs");
});

// show route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// create route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});