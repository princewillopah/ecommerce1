const mongoose = require('mongoose');
const dotenv = require('dotenv');   
const colors = require('colors');
const users = require('./data/user1');
// const products = require('./data/products');
const User = require('./models/UserModel');
// const Product = require('./models/ProductModel');
// const Order = require('./models/OrderModel');
const connectionDB = require('./config/db');



dotenv.config()        
connectionDB()             

const importData = async() => {    
    try {                      
        //delet any contents in these tables
        // await Order.deleteMany()
        await User.deleteMany()
        // await Product.deleteMany()

        //create user
        const createdUsers = await User.insertMany(users)//could have been  simply "await User.insertMany()" but i need the variable "createdUsers" so i can extract the admin from the array of users created
        const admin = createdUsers[0]._id//just get the id of the very first user in d created user//i saved it as admin type from the 'user
 // now we are gonna add the admin user in products sample file so that it will conform with model since user creating product is required
        // const sampleProducts = products.map(product => {
        //     return {...product, user: admin}//we are return several object in this array// the returned object has the product spread and the addtion of user in it
        // })

        // await Product.insertMany(sampleProducts)//popullate the product table with the sampleproduct generated
        console.log('Data imported successfully'.blue.bold);
        process.exit()
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        //delet any contents in these tables
        // await Order.deleteMany()
        // await Product.deleteMany()
        await User.deleteMany()


        console.log('Data Destroy successfully'.blue.bold);
        process.exit()
    } catch (err) {
        console.log(`${err}`.red.inverse);
        process.exit(1)
    }
}

//colling the functions
if(process.argv[2] === '-d'){
 destroyData()
}else{
    importData()
}