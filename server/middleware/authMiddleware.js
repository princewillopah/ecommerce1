const config = require('config')
const jwt = require('jsonwebtoken')


//THIS IS A MIDDLEWARE TO RESTRICT AUTHENTICATION AND AUTHORIZATION
module.exports = function(request,response,next){
    const token = request.header('x-auth-token');// GET THE TOKEN FROM THE HEADER/this is because when we make a request from the frontend to a protected route, we must send the header along//the header has a key "x-auth-token" we created//the header has the token that was givin to use by server while signing up or signing 

    if(!token){// RETURN MESSAGE IF THERE IS NO TOKEN PROVIDED
       return response.status(401).json({message:'NO TOKEN: Authorization Denied'})
    }
// IF TOKEN IS PROVIDED THEN
    try  {
        //verify token://the format://jwt.verify(token, secretOrPublicKey, [options, callback]) where token is the token sent
       const decoded = jwt.verify(token,config.get('jwtSecret'));//verify the token sent and put the jwt token payload in decoded//note the jwt payload contain the user id//remember when creating the payload: {user:{id:ser.id}}//thus, decoded = {user:id:userid}

       request.user = decoded.user;//decoded contain user object whose value is only id from the payload sent with the token(in auth or user routes)// we assign it to request.user SO WE CAN HAVE ASSESS TO request.user in the route
       next()//call next to move on

    }catch(err){
        response.status(401).json({message:'INVALID TOKEN: Authorization Denied'})
        
    }


}