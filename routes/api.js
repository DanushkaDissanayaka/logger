const express = require('express');
const router = express.Router();
const db = require('../models');
const moment = require('moment');
const { Op, Model } = require("sequelize");


router.post('/log', function (req, res, next) {

    const { battery, solar } = req.body

    console.log();
    if (battery === undefined || battery == null || solar === undefined || solar == null) {
        return res.status(400).send({ error: "Bad request" });
    }

    return db.solarchargerdata.create({ battery: battery, solar: solar })
        .then((data) => { 
            // emit event before response
            //req.io.emit("some-event", { battery: battery, solar: solar });
            req.io.sockets.in('user1@example.com').emit('some-event', {msg: 'hello'});
            res.send(data) 
        })
        .catch((err) => {
            console.log('There was an error creating a record', JSON.stringify(err))
            return res.status(500).send(err)
        })
});

router.get('/log', function (req, res, next) {

    var req_date = req.query.date;

    var from = new Date(req_date).setHours(0, 0, 0, 0);
    var to = new Date(req_date).setHours(23, 59, 59, 999);

    return db.solarchargerdata.findAll(
        {
            attributes: ['battery', 'solar', 'createdAt'],
            where: {
                createdAt: {
                    [Op.gt]: from,
                    [Op.lt]: to
                }
            }
        })
        .then((data) => {

            var response = { label: [], battery: [], solar: [] }
            data.forEach(e => {
                response.battery.push(e.battery);
                response.solar.push(e.solar);
                response.label.push(moment(e.createdAt).format("HH:mm"));
            });
            res.send(response)
        }
        )
        .catch((err) => {
            console.log('There was an error querying', JSON.stringify(err))
            return res.send(err)
        });
});

router.delete('/log/:id', function (req, res, next) {
    var id = req.params.id

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