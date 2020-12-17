// const mongoose = require('mongoose');// import mongoose
// const config = require('config');// any files that needs to be used globally
// const db =config.get('mongoURL')//GET THE CONNECTION STRING FROM config

// const connectDB = async () =>{//fumction that holds the db connection
//     try {
//         await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})// the connection
//         console.log('DB CONECTION SUCCESSUFLLY')
        
//     } catch (err) {
//         console.err(err.message)//display error message on console
//         process.exit(1)//exit process with failure
//     }
// }
// module.exports = connectDB;

const mongoose = require('mongoose');// import mongoose
// const config = require('config');// any files that needs to be used globally
// const db =config.get('mongoURL')//GET THE CONNECTION STRING FROM config
// const colors = require('colors')
const connectDB = async () =>{//fumction that holds the db connection
    try {
        const conn = await mongoose.connect(process.env.DATABASE_LOCAL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})// the connection
        console.log(`DB CONECTION SUCCESSUFLLY: ${conn.connection.host}`.cyan.underline.bold)
        // console.log(`DB CONECTION SUCCESSUFLLY: ${conn.connection.host}`)
        // console.log(`DB CONECTION SUCCESSUFLLY:`)
        
    } catch (err) {
        // console.err(err.message)//display error message on console
        console.log(`Error: ${err.mesage}`)
        process.exit(1)//exit process with failure
    }
}   
module.exports = connectDB;