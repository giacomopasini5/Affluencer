module.exports = function(App) {
    const Sensor = App.models.Sensor;
    const utils = App.utils;
    const mongoose = App.db;
    var ctrl = {};

    ctrl.list_shop_sensor_infos = function(req, res) {
        var id = req.body.shop_id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");

        Sensor.find(
            {shop_id: mongoose.Types.ObjectId(id)},
            (err, sensors) => {
                if (err || sensors == null)
                    return res.send(err);
                utils.addTimestampField(sensors);
                res.json(sensors);
            }
        );    
    };

    ctrl.create_shop_sensor_info = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        if (utils.emptyField(body.shop_id)) {
            return res.status(400).send("Missing shop id");
        }
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);

        (new Sensor(body)).save((err, sensor) => {
            if (err)
                return res.json(err);
            res.status(201).json(sensor);
        });
    };

    ctrl.get_shop_sensor_infos = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Sensor.findById(id, (err, sensor) => {
            if (err)
                return res.json(err);
            utils.addTimestampField(sensor);
            res.json(sensor);
        });
    };

    ctrl.get_last_shop_sensor_info = function(req, res) {
        var id = req.body.shop_id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");

        Sensor.find({shop_id: mongoose.Types.ObjectId(id)}).sort({ _id: -1}).limit(1)
        .exec()
        .then(sensor => {
            if (sensor == null)
                return res.send("Sensor error");
            utils.addTimestampField(sensor[0]);
            res.json(sensor[0]);
        });
    };

    ctrl.update_shop_sensor_infos = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Sensor.findByIdAndUpdate(
            id,
            req.body,
            {new: true},
            (err, sensor) => {
                if (err)
                    return res.json(err);
                utils.addTimestampField(sensor);
                res.json(sensor);
            }
        );
    };

    return ctrl;
}