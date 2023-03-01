var secret = process.env.TOKEN_SECRET
var jwt = require("jsonwebtoken");

validateToken = async (req, res, next) => {
    if (req.session.views) {
        req.session.views++
        if (req.cookies.authorizationToken !== undefined) {
            var token = req.cookies.authorizationToken
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("token expire");
                    return res.status(400).send("redirecting to login page, Token has been expired");
                }
                next();
            });
        } else {
            return res.status(400).send("Session out!, redirecting to login page. Please login again")
        }
    } else {
        return res.clearCookie("authorizationToken").status(400).send("Session out!, redirecting to login page. Please login again")
    }
    
};

module.exports = validateToken