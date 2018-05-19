module.exports = {
    checkAuthentication : (req, res, next) => {
        var token = req.headers.token;
        try {
            var decoded = jwt.verify(token, 'myPrivateKey');
            next();
        } catch(err) {
            res.status(500).json({
                config : {
                    requestType : "POST",
                    url : req.headers.host,
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : err.name,
                    key : err.path,
                    value : err.value
                }
            })
        }
    }
}