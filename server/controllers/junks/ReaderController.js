

// exports.updateBook = async(req,res) => {
//     try {
//         const book = await Book.findById(req.params.id)
//         if(book.author.toString() !== req.user._id.toString()){//convert to string so u can make comparison since 2 identical objects(eg id) objects are not equal
//             return res.status(401).json({message:"Unauthorized: You do no have access to update someone else book"})
//          }
       
//         if(book){
//             book.title = req.body.title || book.title
//             book.author = req.user._id
//             book.rating = req.body.rating || book.rating
//             // book.image = req.file.path || book.image
//             book.stock = req.body.stock ||book.stock
//             book.description = req.body.description || book.description
//             const updatedbook =  await book.save()
//             res.status(201).json({book: updatedbook})
       
//         }else{
//             // if(req.file){//if there is a file in tis request/ delete it since this request will not go through
//             //     fs.unlink(req.file.path,(err)=>{console.log(err)})
//             // }
//             res.status(404)
//             throw new Error('book Not Found')
//         }
        
//     } catch (err) {
        
//         console.error(err.message)
//         res.status(400).json({status: 'Failed', message: err.message})
//     }
// }

// exports.deleteBook = async(req,res) => {
//     try {
//         const book = await Book.findById(req.params.id)
        
//         if(book){
//             if(book.author.toString() !== req.user._id.toString()){//convert to string so u can make comparison since 2 identical objects(eg id) objects are not equal
//                 return res.status(401).json({message:"Unauthorized: You do no have access to delete someone else book"})
//              }
//            await book.remove()//delete it//suppose the deleting is restricted to the person tht created it then we make sure the userid === user_id in book
//            res.json({message: 'book Removed'})
//         // res.status(204).json({message: 'book Removed'})
//         }else{
//            res.status(404)
//            throw new Error('book Not Found')
//         }
        
//     } catch (err) {
//         console.log(err.message)
//     }
// }