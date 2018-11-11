const router = require('express').Router();
const Trail = require('../db').import('../models/trail');
// const validateSession = require('../middleware/validatesession');

router.get('/getall', (req, res) => {
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

router.post('/create', (req, res) => {
    Trail.create({
        name: req.body.trail.name,
        location: req.body.trail.location,
        length: req.body.trail.length,
        difficulty: req.body.trail.difficulty,
        notes: req.body.trail.notes,
        completed: req.body.trail.completed,
        date: req.body.trail.date,
        owner: req.user.id
    })
        .then((data) => {
            res.json({
                newtrail: data
            });
        },
            (err) => {
                console.log(err, 'line 48 trailcontroller');
                res.send(500, err.message);
            }
        );
});

router.delete('/delete/:id', (req, res) => {
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

router.put('/update/:id', (req, res) => {
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