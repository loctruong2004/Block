const mongoose = require('mongoose');
// var mongoose = require('./mongoconnection');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/loctruong_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully:');
    } catch (error) {
        console.log('connect failed?');
    }
}

// mongoose.connect("mongodb://localhost:27017/loctruong_dev",
//    { useNewUrlParser: true, useUnifiedTopology: true },
//    function connect (err, res) {
//        try {
//            console.log('Connected to Database');
//        } catch (err) {
//            throw err;
//        }
//    });

module.exports = { connect };
