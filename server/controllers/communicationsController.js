module.exports = function(App) {
    const Communication = App.models.Communication;
    const utils = App.utils;
    var ctrl = {};

    ctrl.list_communications = function(req, res) {
        var body = req.body;
        if (body == null)
            return res.status(400).send("Empty body");
        var obj = null;
        if (!utils.emptyField(body.client_id)) {
            obj = {client_id: body.client_id};
        }
        if (!utils.emptyField(body.shop_id)) {
            obj = {shop_id: body.shop_id};
        }

        Communication.find(obj, (err, com) => {
            if (err)
                return res.status(404).send(err);
            res.json(com);
        });
    };

    /*
    ctrl.list_client_communications = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");

        Communication.find({client_id: req.body.client_id}, (err, com) => {
            if (err)
                res.status(404).send(err);
            res.json(com);
        });
    };
    */

    ctrl.create_communication = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);

        (new Communication(body)).save((err, com) => {
            if (err)
                return res.status(400).send(err);
            res.send("Created");
        });
    };

    ctrl.get_communication = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Communication.findById(id, (err, com) => {
            if (err || com == null)
                return res.status(404).send("Communication not found: "+err);
            res.json(com);
        });
    };

    ctrl.update_communication = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);

        Communication.findByIdAndUpdate(
            id,
            body,
            { new: true },
            (err, com) => {
                if (err)
                    return res.send(err)
                res.json(com);
            }
        );
    };

    ctrl.delete_communication = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Communication.findByIdAndRemove(id, (err, com) => {
            if (err)
                return res.send(err);
            res.send("Deleted");
        });
    };

    return ctrl;
}