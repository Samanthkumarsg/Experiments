const jwt = require('jsonwebtoken');

module.exports = {
    checkAuthentication : (req, res, next) => {
        if(req.headers.token){
            var token = req.headers.token.split(" ")[1];
            var decoded = jwt.verify(token, 'myPrivateKey');
            next();
        }
        else{
            res.status(500).json({
                config : {
                    requestType : "POST",
                    url : req.headers.host,
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : "Authentication Error",
                    message : "Token doesn't match"
                }
            })
        }
    }
}