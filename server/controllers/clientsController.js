const mongoose = require('mongoose');
const utils = require('../common.js');

var Client = require("../models/clientsModel.js")(mongoose);

exports.list_clients = function(req, res) {
    Client.find({}, function(err, clients) {
        if (err)
            res.send(err);
        res.json(clients);
    }); 
};

exports.create_client = function(req, res) {
    if (req.body == null)
        res.status(400).send("Empty body");

    (new Client(req.body)).save(function(err, client) {
        if (err)
            res.send(err);
        res.status(201).json(client);
    });
};

exports.get_client = function(req, res) {
    if (utils.emptyField(req.params.id))
        res.status(400).send("Missing id");

    Client.findById(id, function(err, client) {
        if (err || client == null)
            res.status(404).send("Client not found");

        res.json(client);
    });
};

exports.update_client = function(req, res) {
    if (utils.emptyField(req.params.id))
        res.status(400).send("Missing id");

    Client.findOneAndUpdate(
        req.params.id,
        req.body,
        { new: true, useFindAndModify: false },
        (err, client) => {
            if (err)
                res.send(err);
            res.json(client);
        }
    );
}