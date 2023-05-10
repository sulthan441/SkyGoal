const mongoose = require('mongoose')
const MONGODB_URI = `mongodb://localhost:27017/Auth`

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDataBase');
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    connect
}



