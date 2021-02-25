const mongoose = require('mongoose');
const utils = require("../common.js");

var Communication = require("../models/communicationsModel.js")(mongoose);

exports.list_shop_communications = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Communication.find({shop_id: req.body.shop_id}, (err, com) => {
        if (err)
            res.status(404).send(err);
        res.json(com);
    });
};

exports.list_client_communications = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Communication.find({client_id: req.body.client_id}, (err, com) => {
        if (err)
            res.status(404).send(err);
        res.json(com);
    });
};

exports.create_communication = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Communication(req.body)).save((err, com) => {
        if (err)
            res.status(400).send(err);
        res.send("Created");
    });
};

exports.get_communication = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Communication.findById(id, (err, com) => {
        if (err || com == null)
            res.status(404).send("Communication not found: "+err);
        res.json(com);
    });
};

exports.update_communication = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    if (req.body == null)
        return res.status(400).send("Empty body");

    Communication.findOneAndUpdate(
        id,
        req.body,
        { new: true, useFindAndModify: false },
        (err, com) => {
            if (err)
                res.send(err)
            res.json(com);
        }
    );
};

exports.delete_communication = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Communication.findByIdAndRemove(id, (err, com) => {
        if (err)
            res.send(err);
        res.send("Deleted");
    });
};