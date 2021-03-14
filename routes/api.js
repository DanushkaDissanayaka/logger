const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/log', function (req, res, next) {

    const { value } = req.body
    if (value === undefined || value == null) {
        return res.status(400).send({ error: "Bad request" });
    }

    return db.sensordata.create({ values: value })
        .then((data) => res.send(data))
        .catch((err) => {
            console.log('There was an error creating a record', JSON.stringify(contact))
            return res.status(500).send(err)
        })
});

router.get('/log', function (req, res, next) {

    return db.sensordata.findAll()
        .then((data) => res.send(data))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.send(err)
        });
});

router.delete('/log/:id', function (req, res, next) {
    var id = req.params.id

    console.log(id);

    if (id === undefined || id == null) {
        return res.status(400).send({ error: "Bad request" });
    }

    return db.sensordata.findByPk(id)
        .then((record) => record.destroy({ force: true }))
        .then(() => res.send({ id }))
        .catch((err) => {
            console.log('Error deleting', JSON.stringify(err))
            res.status(500).send(err)
        })
})

module.exports = router;