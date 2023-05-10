const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGO_URI

async function connect(){
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log('Connected to MongoDataBase');
    }
    catch(e){
        console.error(err);
    }
}

module.exports={
    connect
}