const mongoose = require('mongoose');
async function connectMongoDB() {

    await mongoose.connect('mongodb://127.0.0.1:27017/customDB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(function (con) {
            console.log('MongoDB Connected to Database'.bgGreen.black);
        }).catch(function (err) {
            console.log(err.code, err.message.underline.red);
        });

}

module.exports = { connectMongoDB }