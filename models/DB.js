const mongoose = require('mongoose')
const Db = async() => {
    try{
         await mongoose.connect(`${process.env.MONGO_URI}/logicc`)
         console.log('Connected to MongoDB')
    }
    catch(err){
        console.log(err)
        }
}

module.exports = Db
