module.exports = function(App) {
    const Communication = App.models.Communication;
    const utils = App.utils;
    const mongoose = App.db;
    var ctrl = {};

    ctrl.list_communications = function(req, res) {
        var obj = null;
        var set = false;
        if (!utils.emptyField(req.query.client_id)) {
            obj = {client_id: mongoose.Types.ObjectId(req.query.client_id)};
            set = true;
        }
        if (!utils.emptyField(req.query.shop_id)) {
            obj = {shop_id: mongoose.Types.ObjectId(req.query.shop_id)};
            set = true;
        }
        if (!set) {
            return res.status(400).send("Missing shop or client id");
        }

        Communication.find(obj, (err, com) => {
            if (err)
                return res.status(404).send(err);
            //utils.addTimestampField(com);
            res.json(com);
        });
    };

    ctrl.create_communication = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);
        body.timestamp = new Date();

        (new Communication(body)).save((err, com) => {
            if (err)
                return res.status(400).send(err);
            //utils.addTimestampField(com);
            res.send(com);
        });
    };

    ctrl.get_communication = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Communication.findById(id, (err, com) => {
            if (err || com == null)
                return res.status(404).send("Communication not found: "+err);
            //utils.addTimestampField(com);
            res.json(com);
        });
    };

    ctrl.update_communication = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");

        Communication.findByIdAndUpdate(
            id,
            body,
            { new: true },
            (err, com) => {
                if (err)
                    return res.send(err)
                //utils.addTimestampField(com);                    
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