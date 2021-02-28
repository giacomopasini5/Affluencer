const mongoose = require('mongoose');
const utils = require("../common.js");

var Notification = require("../models/notificationsModel.js")(mongoose);

exports.list_user_notifications = function(req, res) {
    var id = req.body.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing user id");

    Notification.find(
        {user_id: mongoose.Types.ObjectId(id)},
        (err, notifications) => {
            if (err || notifications == null)
                res.send(err);
            res.json(notifications);
        }
    );    
};

exports.create_user_notification = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Notification(req.body)).save((err, notification) => {
        if (err)
            res.json(err);
        res.status(201).json(notification);
    });
};

exports.get_user_notification = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var user_id = req.params.user_id;
    if (utils.emptyField(user_id))
        res.status(400).send("Missing user id");

    Notification.findById(id, (err, notification) => {
        if (err)
            res.json(err);
        res.json(notification);
    });
};

exports.update_user_notification = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var user_id = req.params.user_id;
    if (utils.emptyField(user_id))
        res.status(400).send("Missing user id");

    Notification.findByIdAndUpdate(
        id,
        req.body,
        {new: true},
        (err, notification) => {
            if (err)
                res.json(err);
            res.json(notification);
        }
    );
};

exports.delete_user_notification = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Notification.findByIdAndRemove(id, (err, notif) => {
        if (err)
            res.send(err);
        res.send("Deleted");
    });
};