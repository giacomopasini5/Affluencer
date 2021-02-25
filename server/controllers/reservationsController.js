const mongoose = require('mongoose');
const utils = require("../common.js");

var Reservation = require("../models/reservationsModel.js")(mongoose);

exports.list_shop_reservations = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Reservation.find({shop_id: req.body.shop_id}, (err, reservations) => {
        if (err)
            res.status(404).send(err);
        res.json(reservations);
    });
};

exports.list_client_reservations = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Reservation.find({client_id: req.body.client_id}, (err, reservations) => {
        if (err)
            res.status(404).send(err);
        res.json(reservations);
    });
};

exports.create_reservation = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Reservation(req.body)).save((err, reservation) => {
        if (err)
            res.status(400).send(err);
        res.send("Created");
    });
};

exports.get_reservation = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Reservation.findById(id, (err, reservation) => {
        if (err || reservation == null)
            res.status(404).send("Reservation not found: "+err);
        res.json(reservation);
    });
};

exports.update_reservation = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    if (req.body == null)
        return res.status(400).send("Empty body");

    Reservation.findOneAndUpdate(
        id,
        req.body,
        { new: true, useFindAndModify: false },
        (err, reservation) => {
            if (err)
                res.send(err)
            res.json(reservation);
        }
    );
};

exports.delete_reservation = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Reservation.findByIdAndRemove(id, (err, reservation) => {
        if (err)
            res.send(err);
        res.send("Deleted");
    });
};

