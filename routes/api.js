const express = require('express');
const router = express.Router();
const db = require('../models');
const moment = require('moment');
const { Op, Model } = require("sequelize");


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

    var req_date = req.query.date;

    var from = new Date(req_date).setHours(0,0,0,0);
    var to = new Date(req_date).setHours(23,59,59,999);

    return db.sensordata.findAll(
        {
            attributes: ['values', 'createdAt'],
            where: {
                createdAt: {
                    [Op.gt]: from,
                    [Op.lt]: to
                }
            }
        })
        .then((data) => {

            var response = { label: [], data: [] }
            data.forEach(e => {
                response.data.push(e.values);
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