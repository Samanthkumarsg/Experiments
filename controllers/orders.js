module.exports = {
    getAllOrders : (req, res, next) => {
        res.status(200).json({
            message : "Got the request"
        })
    }
}