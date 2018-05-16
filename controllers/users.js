module.exports = {
    getAllUsers : (req, res, next) => {
        res.status(200).json({
            message : "Got the request"
        })
    }
}