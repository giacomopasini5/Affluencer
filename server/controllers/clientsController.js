const mongoose = require('mongoose');
const utils = require('../common.js');
const bcrypt = require('bcrypt');
const saltRound = 10;

var Client = require("../models/clientsModel.js")(mongoose);
//const { Shop } = require("../controllers/shopsController.js");

exports.list_clients = function(req, res) {
    Client.find({}, function(err, clients) {
        if (err)
            return res.send(err);
        res.json(clients);
    }); 
};

exports.create_client = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");
    var body = req.body;
    body.enabled = true;

    bcrypt.genSalt(saltRound)
    .then(salt => {
        return bcrypt.hash(body.password, salt);
    })
    .then(hash => {
        body.password = hash;
        (new Client(body)).save(function(err, client) {
            if (err)
                return res.send(err);
            res.status(201).json({
                id: client._id,
                username: client.email,
                usertype: 'client'
            });    
        });
    });
};

exports.get_client = function(req, res) {
    if (utils.emptyField(req.params.id))
        return res.status(400).send("Missing id");

    Client.findById(req.params.id, function(err, client) {
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
                return res.send(err);
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
            return res.send(err);
        console.log(res.json(fs.favorite_shops));
    });
};

exports.add_client_favorite_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing client id");
    var shop_id2 = req.body.shop_id
    if (utils.emptyField(shop_id2))
        return res.status(400).send("Missing shop id");
    var shop_name2 = req.body.shop_name
    if (utils.emptyField(shop_name2))
        return res.status(400).send("Missing shop name");

    Client.findByIdAndUpdate(
        id,
        { $push: { favorite_shops: { shop_id:mongoose.Types.ObjectId(shop_id2), shop_name:shop_name2 }}},
        { new: true },
        (err, client) => {
            if (err)
                return res.send(err);
            res.send(client);
        }
    );
};

exports.remove_client_favorite_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing client id");
    var shop_id2 = req.params.shop_id
    if (utils.emptyField(shop_id2))
        return res.status(400).send("Missing shop id");

    Client.findByIdAndUpdate(
        id,
        { $pull: { favorite_shops: { shop_id:mongoose.Types.ObjectId(shop_id2) }}},
        (err, client) => {
            if (err)
                return res.send(err);
            res.send("Removed");
        }
    );
};

exports.Client = Client;