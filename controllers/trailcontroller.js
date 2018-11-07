const router = require('express').Router();
const Trail = require('../db').import('../models/trail');
const validateSession = require('../middleware/validatesession');

router.get('/getall', validateSession, (req, res) => {
    let owner = req.user.id;
    Trail.findAll({
        where: { owner: owner }
    })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.post('/create', validateSession, (req, res) => {
    let owner = req.user.id;
    Trail.create({
        name: req.body.trail.name,
        location: req.body.trail.location,
        length: req.body.trail.length,
        difficulty: req.body.trail.difficulty,
        notes: req.body.trail.notes,
        completed: req.body.trail.completed,
        date: req.body.trail.date,
        owner: owner
    })
        .then(createSuccess = (data) => {
            res.json({
                newtrail: data
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
    Trail.destroy({
        where: { id: data, owner: owner }
    })
        .then(
            deleteSuccess = (data) => {
                res.send(`${data}`);
            },
            deleteError = (err) => {
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', validateSession, (req, res) => {
    let data = req.params.id;
    let owner = req.user.id;
    Trail.update({
        name: req.body.trail.name,
        location: req.body.trail.location,
        length: req.body.trail.length,
        difficulty: req.body.trail.difficulty,
        notes: req.body.trail.notes,
        completed: req.body.trail.completed,
        date: req.body.trail.date
    },
        { where: { id: data, owner: owner } }
    )
        .then(
            updateSuccess = (data) => {
                res.json({
                    trailupdate: data
                });
            },
            updateError = (err) => {
                res.send(500, err.message);
            }
        )
});

module.exports = router;