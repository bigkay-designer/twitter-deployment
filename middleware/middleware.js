let middlewareObj = {}

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        console.log('you have to login first')
        return next()
    }
}

module.exports = middlewareObj
