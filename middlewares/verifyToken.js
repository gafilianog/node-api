const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).json({
            message: 'Unauthorized access.'
        });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}

module.exports = { verifyToken };