const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/travanest');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : '683547f4812a3eaabc6e089a'}));
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
};

initDB();