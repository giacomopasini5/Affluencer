import { ObjectId } from "mongodb";
const mongoose = require('mongoose');
var Client = require("../models/clientsModel.js")(mongoose);

exports.list_clients = function(req, res) {
    Client.find({}, function(err, clients) {
        if (err)
            res.send(err);
        res.json(clients);
    }); 
};

exports.create_client = function(req, res) {
    var newClient = new Client(res.body);
    newClient.save(function(err, client) {
        if (err)
            res.send(err);
        res.json(client);
    });
};

exports.read_client = function(req, res) {
    console.log(req.body);

    var obj_id = new ObjectId(req.body.id);
    Client.findById(obj_id, function(err, client) {
        if (err)
            res.send(err);
        
        if (client == null) {
            res.status(404).send("Client not found");
        } else {
            res.json(client);
        }
    });
};

exports.update_client = function(req, res) {

    console.log(req.body);
    var clientInfos = {
        // campi da aggiornare
    }

    /*
    Client.findOneAndUpdate({ _id: req.params.id }, clientInfos, { new: true }, function(err, client) {
        if (err)
            res.send(err);
        res.json(client);
    });
    */
}