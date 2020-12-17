const Book = require('../models/BookModel')
const Reader = require('../models/ReadModel')


exports.creatBook = async(req,res,next)=>{
    try {
        const newBook = await Book.create({
            title: req.body.title,
            rating:req.body.rating,
            stock: req.body.stock,
            description: req.body.description,
            imageCover: req.body.imageCover,
            author: req.user._id,

        }) //req.body = { all our request from form}

        res.status(201).json({status: 'success', data: {book: newBook}})
    } catch (err) {
        if(err.code === 11000){
            const Bookname = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the Bookname and getting the first one
            res.status(400).json({status: 'Failed', message: `Duplicated Book Name: ${Bookname}. please use another name value `})
        }else{
            res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
        }
      

        // //  or simply pass it to the general global  middleware error handler to do it
        // next(err)
    }

}; 

exports.updateBook = async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(book.author.toString() !== req.user._id.toString()){//convert to string so u can make comparison since 2 identical objects(eg id) objects are not equal
            return res.status(401).json({message:"Unauthorized: You do no have access to update someone else book"})
         }
       
        if(book){
            book.title = req.body.title || book.title
            book.author = req.user._id
            book.rating = req.body.rating || book.rating
            // book.image = req.file.path || book.image
            book.stock = req.body.stock ||book.stock
            book.description = req.body.description || book.description
            const updatedbook =  await book.save()
            res.status(201).json({book: updatedbook})
       
        }else{
            // if(req.file){//if there is a file in tis request/ delete it since this request will not go through
            //     fs.unlink(req.file.path,(err)=>{console.log(err)})
            // }
            res.status(404)
            throw new Error('book Not Found')
        }
        
    } catch (err) {
        
        console.error(err.message)
        res.status(400).json({status: 'Failed', message: err.message})
    }
}


exports.deleteBook = async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        
        if(book){
            if(book.author.toString() !== req.user._id.toString()){//convert to string so u can make comparison since 2 identical objects(eg id) objects are not equal
                return res.status(401).json({message:"Unauthorized: You do no have access to delete someone else book"})
             }
           await book.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in book
           res.json({message: 'book Removed'})
        // res.status(204).json({message: 'book Removed'})
        }else{
           res.status(404)
           throw new Error('book Not Found')
        }
        
    } catch (err) {
        console.log(err.message)
    }
}


exports.viewBook = async(req,res,next)=>{
    const book = await Book.findById(req.params.id)
    try {
        if(book){
            res.json(book)
         }else{
            res.status(404)
            throw new Error('book Not Found');//handlw formated ids that re not in DB
         }

        res.status(201).json({status: 'success', data: {book: newBook}})
    } catch (err) {
        
            res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
    
    }

}; 

exports.borrowBook = async(req,res,next)=>{
   
    try {
        const book = await Book.findById(req.params.id)
        // if(book._id === req.params.id && ){

        // }
        // const alreadyReviewed =  product.reviews.find(r => r.user.toString() === req.user._id.toString())
        //     if(alreadyReviewed){//if the user has reivewew this product before
        //         res.status(401)
        //         throw new Error('You have already reviewed this product')
        //     }//else
        if(book){
            const notReturnedBook =  await Reader.find({book:book._id,reader:req.user._id,returned:false})
            // const notReturnedBook =  await Reader.find({})
            if(notReturnedBook.length > 0){//if the user has reivewew this product before
                res.status(401)
                throw new Error('You have already borrowed this book and have not returned it')
            }else if(book.stock === 0) {
                res.status(401)
                throw new Error('The book you request for is out of stock')
            }                       

            const newRead = await Reader.create({
                book: book._id,//same as req.params.id
                reader:req.user._id,
            }) //req.body = { all our request from form}
            // res.status(201).json({ data: {newRead: book}})
            book.stock = book.stock - 1;
            await book.save()

            res.json({allBook:newRead})   
        }else{
            res.status(404)
            throw new Error('book Not Found');//handlw formated ids that re not in DB
        }
      

        
    } catch (err) {
        
            res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message

        // //  or simply pass it to the general global  middleware error handler to do it
        // next(err)
    }

}; 

exports.returnedBook = async(req,res,next)=>{
   
    try {
        const book = await Book.findById(req.params.id)

        if(book){
            const notReturnedBook =  await Reader.find({book:book._id,reader:req.user._id,returned:false})
            // const notReturnedBook =  await Reader.find({})
            if(notReturnedBook.length > 0){//if the user has reivewew this product before
                res.json(notReturnedBook)
            }                      

            book.stock = book.stock + 1;
            await book.save() 

            // res.json({allBook:newRead})   
        }else{
            res.status(404)
            throw new Error('book Not Found');//handlw formated ids that re not in DB
        }
      

        
    } catch (err) {
        if(err.code === 11000){
            const Bookname = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]//match(/(["'])(\\?.)*?\1/)[0] get the chtching the Bookname and getting the first one
            res.status(400).json({status: 'Failed', message: `Duplicated Book Name: ${Bookname}. please use another name value `})
        }else{
            res.status(400).json({status: 'Failed', message: err.message})//send the statusCode 400//the status: failed// and the exact message: err.message
        }
      

        // //  or simply pass it to the general global  middleware error handler to do it
        // next(err)
    }

};