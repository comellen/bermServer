const router = require('express').Router();
const Bike = require('../db').import('../models/bike');
const validateSession = require('../middleware/validatesession');

router.get('/getall', validateSession, (req, res) => {
    let owner = req.user.id;
    console.log(owner);
    Bike.findAll({
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
    let owner = req.user.id;
    Bike.create({
        brand: req.body.bike.brand,
        model: req.body.bike.model,
        year: req.body.bike.year,
        frame: req.body.bike.frame,
        suspension: req.body.bike.suspension,
        fork: req.body.bike.fork,
        shock: req.body.bike.shock,
        wheelSize: req.body.bike.wheelSize,
        shifters: req.body.bike.shifters,
        derailleur: req.body.bike.derailleur,
        cassette: req.body.bike.cassette,
        brakes: req.body.bike.brakes,
        tires: req.body.bike.tires,
        additionalComponents: req.body.bike.additionalComponents,
        plannedUpgrades: req.body.bike.plannedUpgrades,
        owner: owner,
    })
        .then(createSuccess = (newbike) => {
            res.json({
                newbike: newbike
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
    Bike.destroy({
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
    Bike.update(
        {
            brand: req.body.bike.brand,
            model: req.body.bike.model,
            year: req.body.bike.year,
            frame: req.body.bike.frame,
            suspension: req.body.bike.suspension,
            fork: req.body.bike.fork,
            shock: req.body.bike.shock,
            wheelSize: req.body.bike.wheelSize,
            shifters: req.body.bike.shifters,
            derailleur: req.body.bike.derailleur,
            brakes: req.body.bike.brakes,
            tires: req.body.bike.tires,
            additionalComponents: req.body.bike.additionalComponents,
            plannedUpgrades: req.body.bike.plannedUpgrades,
            owner: owner,
        },
        { where: { id: data, owner: owner } }
    )
        .then(
            updateSuccess = (data) => {
                res.json({
                    bikeupdate: data
                });
            },
            updateError = (err) => {
                res.send(500, err.message);
            }
        )
});

module.exports = router;