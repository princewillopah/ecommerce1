const express = require('express');// import express
const connectDB = require('./config/db');//import db
const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const  {notFound, errorHandler} = require('./middleware/globalErrorHandler')
// const {notFound, errorHandler} = require('./middleware/errorsMiddleware')
// const bodyParser = require('body-parser')//for request to work
// const mongoose = require('mongoose')
// const placeRoutes = require('./routes/places-route')

// const HttpError = require('./models/http-errors');
const cors = require('cors')//for cors
// app.use(cors()) // for CORS IN FRONTEND
const path = require('path')


// const mongoose = require('mongoose')

// const bodyParser = require('body-parser')//for request to work
const app = express();// initialisinf express into variable "app"

// INITIALIZING MIDDLEWARE FOR BODY PARSER
app.use(express.json({extended:false}));//for req.body to work// to beable to make request in forms


app.use(cors()) // for CORS IN FRONTEND 

// app.use('/uploads/users',express.static(path.join('uploads','users')));//making uploads/images publicly accessible by frontend
// app.use('/uploads/products',express.static(path.join('uploads','products')));
// app.use('/uploads',express.static('uploads'));
app.use('/uploads/products', express.static(path.join(__dirname, '/uploads','products')));
// app.use('/public', express.static(path.join(__dirname, '/public')));
// app.use('/public', express.static('public'));

//DEFINING ROUTES
// app.use('/api/places', require('./routes/places-route'))
// app.use('/api/users', require('./routes/api/users'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))
// app.use('/api/products', require('./routes/api/product'))
app.use('/api', require('./routes/couponRoute')) 
app.use('/api', require('./routes/authRoutes')) 
app.use('/api/categories', require('./routes/categoryRoutes')) 
app.use('/api/sub-categories', require('./routes/subCategoryRoutes')) 
app.use('/api', require('./routes/usersRoutes')) 
app.use('/api', require('./routes/adminRoutes')) 
app.use('/api/products', require('./routes/productRoutes')) 
app.use('/api', require('./routes/stripeRoute')) 
app.use('/api', require('./routes/cloudinaryRoutes')) 
app.use('/api/local-server', require('./routes/imageRoutes')) 
// app.use('/api/products', require('./routes/api/product'))
// app.use('/api/books',require('./routes/bookRoutes'))//calling route 
// app.use('/api/users',usersRoutes)//calling route 



// --------- errors ----------------------------------------------------
// // middleware for  404
app.use((req,res,next)=>{//this is a middleware//this should come after the routes
        throw new HttpError('Cound not find this route',404)
 })

// middleware for  unknown error
app.use((error,req,res,next)=>{//this is a middleware//this should come after the routes
   if(res.headerSent){
       return next(error);
   }
   res.status(error.code || 500)
   res.json({message:error.message || 'An Unknown Error has occurred!'})
})

// middleware to handle NOT FOUND ERROR
app.use(notFound)

// // middleware to handle OTHER ERROR
app.use(errorHandler)
// app.use(globalErrorHandler)

// -----------databases connection------------------------------------------------------
// db connection and server
// mongoose.connect('mongodb://localhost/book-lib',{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
//             .then(()=>{
//                 const PORT = process.env.POST || 5000; // VARIABLE process.env.PORT is a production port // 5000 is a dev port
//                 app.listen(PORT, () => console.log(`SERVER STATED ON PORT: ${PORT}`));//LISTEN TO A PORT//OPTIONAL FUNCTION
//             })
//             .catch(err=>{console.log(err)})

// --------------------------------------------------
//connect database
connectDB()    
// -------------------------------------------  
// const url = process.env.DATABASE_LOCAL;
// const deprecations = {useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false}
// mongoose.connect(url, deprecations)
// .then(
//     () => { console.log('DATABASE CONNECTION SUCCESSFUL')},//if successful
//     err => { console.log('FAILED DATABASE CONNECTION')}//if errors
//   )

//server
const PORT = process.env.PORT || 4000; // VARIABLE process.env.PORT is a production port // 5000 is a dev port
app.listen(PORT, () => console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));//LISTEN TO A PORT//OPTIONAL FUNCTION
          
 