module.exports = async (req, res,next) => {
    Object.keys(req.body).forEach((key, Index) => {
        if ( req.body[key] === "" || req.body[key].length == 0) delete req.body[key]
    })
    next()
}