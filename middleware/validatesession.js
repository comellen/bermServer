const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const sessionToken = req.headers.authorization;
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(sessionToken, process.env.SECRET, (err, decodedToken) => {
                if (!err && decodedToken) {
                    User.findOne({ where: { id: decodedToken.id } })
                        .then(user => {
                            if (!user) throw 'err';
                            req.user = user;
                            return next();
                        })
                        .catch(err => next(err));
                } else {
                    req.errors = err;
                    return next();
                }
            });
        }
    }
};