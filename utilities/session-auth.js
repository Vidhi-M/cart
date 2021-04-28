

const PUBLIC_ROUTE = ['/login', '/signup', '/availableShapes']

module.exports = async (req, res, next) => {
    try {
        if (PUBLIC_ROUTE.includes(req.path)) next()
        else if (!req.session.user) throw new Error('unauthorized')
        else next()
    } catch (err) {
        err.status = 401
        next(err)
    }
}