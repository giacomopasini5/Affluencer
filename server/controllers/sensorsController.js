const mongoose = require('mongoose');
const utils = require("../common.js");

var Sensor = require("../models/sensorsModel.js")(mongoose);

exports.list_shop_sensor_infos = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing shop id");

    Sensor.find(
        {shop_id: mongoose.Types.ObjectId(id)},
        (err, sensors) => {
            if (err || sensors == null)
                res.send(err);
            res.json(sensors);
        }
    );    
};

exports.create_shop_sensor_info = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Sensor(req.body)).save((err, sensor) => {
        if (err)
            res.json(err);
        res.status(201).json(sensor);
    });
};

exports.get_shop_sensor_infos = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var shop_id = req.params.shop_id;
    if (utils.emptyField(shop_id))
        res.status(400).send("Missing post id");

    Sensor.findById(id, (err, sensor) => {
        if (err)
            res.json(err);
        res.json(sensor);
    });
};

exports.update_shop_sensor_infos = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var shop_id = req.params.shop_id;
    if (utils.emptyField(shop_id))
        res.status(400).send("Missing post id");

    Sensor.findByIdAndUpdate(
        id,
        req.body,
        {new: true},
        (err, sensor) => {
            if (err)
                res.json(err);
            res.json(sensor);
        }
    );
};