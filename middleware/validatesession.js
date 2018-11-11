const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const sessionToken = req.headers.authorization;
        console.log(sessionToken, 'line 9 in validatesession');
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(sessionToken, process.env.SECRET, (err, decodedToken) => {
                if (decodedToken) {
                    User.findOne({ where: { id: decodedToken.id } })
                        .then(user => {
                            req.user = user;
                            return next();
                        },
                        () => {res.status(401).send({error: 'Not authorized'})});
                } else {
                    res.status(400).send(({error: 'Not supported'}));
                }
            });
        }
    }
};