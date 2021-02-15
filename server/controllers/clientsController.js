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
        return res.status(400).send("Empty body");

    (new Client(req.body)).save(function(err, client) {
        if (err)
            res.send(err);
        res.status(201).json(client);
    });
};

exports.get_client = function(req, res) {
    if (utils.emptyField(req.params.id))
        return res.status(400).send("Missing id");

    Client.findById(id, function(err, client) {
        if (err || client == null)
            return res.status(404).send("Client not found");

        res.json(client);
    });
};

exports.update_client = function(req, res) {
    if (utils.emptyField(req.params.id))
        return res.status(400).send("Missing id");

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

exports.list_client_favorite_shops = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing client id");

    Client.findById(id, "favorite_shops", (err, fs) => {
        if (err)
            res.send(err);
        res.json(fs);
    });
};

exports.add_client_favorite_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing client id");
    var shop_id = req.body.shop_id
    if (utils.emptyField(shop_id))
        return res.status(400).send("Missing shop id");

    Client.findByIdAndUpdate(
        id,
        { $push: { favorite_shops: shop_id }},
        (err, client) => {
            if (err)
                res.send(err);
            res.send(shop_id);
        }
    );
};

exports.remove_client_favorite_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing client id");
    var shop_id = req.params.shop_id
    if (utils.emptyField(shop_id))
        return res.status(400).send("Missing shop id");

    Client.findByIdAndUpdate(
        id,
        { $pull: { favorite_shops: shop_id }},
        (err, client) => {
            if (err)
                res.send(err);
            res.send("Removed");
        }
    );
};