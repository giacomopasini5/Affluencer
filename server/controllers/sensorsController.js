module.exports = function(App) {
    const Sensor = App.models.Sensor;
    const utils = App.utils;
    var ctrl = {};

    ctrl.list_shop_sensor_infos = function(req, res) {
        var id = req.body.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");

        Sensor.find(
            {shop_id: mongoose.Types.ObjectId(id)},
            (err, sensors) => {
                if (err || sensors == null)
                    return res.send(err);
                res.json(sensors);
            }
        );    
    };

    ctrl.create_shop_sensor_info = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
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
        /*
        var shop_id = req.params.shop_id;
        if (utils.emptyField(shop_id))
            res.status(400).send("Missing post id");
        */

        Sensor.findById(id, (err, sensor) => {
            if (err)
                return res.json(err);
            res.json(sensor);
        });
    };

    ctrl.update_shop_sensor_infos = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        /*
        var shop_id = req.params.shop_id;
        if (utils.emptyField(shop_id))
            res.status(400).send("Missing post id");
        */

        Sensor.findByIdAndUpdate(
            id,
            req.body,
            {new: true},
            (err, sensor) => {
                if (err)
                    return res.json(err);
                res.json(sensor);
            }
        );
    };

    return ctrl;
}