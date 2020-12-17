exports.notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${res.orinalUrl}`)
    res.status(404)
    next(error)
 }
 
 exports.errorHandler = (err,req,res,next) => {
     const statusCode = res.statusCode === 200 ? 500 : res.statusCode
     res.status(statusCode)
     res.json({
         message: err.message,
         stack: process.env.NODE_ENV === 'production' ? null : err.stack
     })
 }

exports.globalErrorHandler = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500 //if statusCode is sent show it, else show 500 as statusCode
    err.status     = err.status     || 'Failed'
    res.status(err.statusCode).json({status: err.status, message: err.message})
}

// module.exports = GlobalErrorHandler