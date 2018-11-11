const router = require('express').Router();
const Ride = require('../db').import('../models/ride');
const validateSession = require('../middleware/validatesession');

router.get('/getall', validateSession, (req, res) => {
    let owner = req.user.id;
    Ride.findAll({
            where: { owner: owner }
        })
        .then(
            findAllSuccess = (data) => {
                res.json(data);
            },
            findAllError = (err) => {
                res.send(500, err.message);
            }
        );
});

router.post('/create', validateSession, (req, res) => {
    Ride.create({
        trail: req.body.ride.trail,
        location: req.body.ride.location,
        bike: req.body.ride.bike,
        time: req.body.ride.time,
        notes: req.body.ride.notes,
        date: req.body.ride.date,
        owner: req.user.id
    })
        .then(createSuccess = (data) => {
            res.json({
                newride: data
            });
        },
            createError = (err) => {
                res.send(500, err.message);
            }
        );
});

router.delete('/delete/:id', validateSession, (req, res) => {
    let data = req.params.id;
    let owner = req.user.id;
    Ride.destroy({
        where: { id: data, owner: owner }
    })
        .then(
            deleteLogSuccess = (data) => {
                res.send(`${data}`);
            },
            deleteLogError = (err) => {
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', validateSession, (req, res) => {
    let data = req.params.id;
    let owner = req.user.id;
    Ride.update(
        {
            trail: req.body.ride.trail,
            location: req.body.ride.location,
            bike: req.body.ride.bike,
            time: req.body.ride.time,
            notes: req.body.ride.notes,
            date: req.body.ride.date,
            owner: owner
        },
        { where: { id: data, owner: owner } }
    )
        .then(
            updateSuccess = (data) => {
                res.json({
                    rideupdate: data
                });
            },
            updateError = (err) => {
                res.send(500, err.message);
            }
        )
});

module.exports = router;