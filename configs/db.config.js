const mongoose = require('mongoose')

const connectDB = async() =>{
     const connection = await mongoose.connect(process.env.MONOGO_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true,

     });

     console.log('MongoDB Connected:${connection.connection}')
}

module.exports = connectDB;