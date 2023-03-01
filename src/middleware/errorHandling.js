const errorHandling = (err, req, res,next)=>{
    if(err){
        return res.status(400).send(err.message)
    }
    next()
}
module.exports = errorHandling