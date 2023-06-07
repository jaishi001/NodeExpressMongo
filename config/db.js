const mongoose = require('mongoose');
async function connectMongoDB() {

    await mongoose.connect('mongodb://127.0.0.1:27017/testDB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(function (con) {
            console.log('Connected To MongoDB');
        }).catch(function (err) {
            console.log(err.code, err.message.underline.red);
        });

}

module.exports = { connectMongoDB }