const mongoose = require('mongoose');
const utils = require('../common.js');

var Review = require("../models/reviewsModel.js")(mongoose);

exports.list_client_reviews = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Review.find({ client_id: req.body.client_id }, (err, reviews) => {
        if (err)
            res.status(404).send(err);
        res.json(reviews);
    });
};

exports.list_shop_reviews = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    Review.find({ shop_id: req.body.shop_id }, (err, reviews) => {
        if (err)
            res.status(404).send(err);
        res.json(reviews);
    });
};

exports.create_review = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Review(req.body)).save((err, review) => {
        if (err)
            res.status(400).send(err);
    });
};

exports.get_review = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Review.findById(id, (err, review) => {
        if (err || review == null)
            res.status(404).send("Review not found: "+err);
        res.json(review);
    });
};

exports.update_review = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    if (req.body == null)
        return res.status(400).send("Empty body");

    Review.findOneAndUpdate(
        id,
        req.body,
        { new: true, useFindAndModify: false },
        (err, review) => {
            if (err)
                res.send(err)
            res.json(review);
        }
    );
};

exports.delete_review = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Review.findByIdAndRemove(id, (err, review) => {
        if (err)
            res.send(err);
        res.send("Deleted");
    });
};

exports.list_review_comments = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Review.findById(id, "comments", (err, comments) => {
        if (err)
            res.send(err);
        res.json(comments);
    });
};

exports.create_review_comment = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    if (req.body == null)
        return res.status(400).send("Empty body");

    Review.findByIdAndUpdate(
        id,
        { $push: { comments: req.body }},
        (err, review) => {
            if (err)
                res.send(err);
            res.json(review.comments[review.comments.length-1]);
        }
    );
};

exports.get_review_comment = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var dt = req.params.datetime;
    if (utils.emptyField(dt))
        return res.status(400).send("Missing comment id");

    Review.findById(
        id,
        { comments: { $elemMatch: { datetime: dt }}},
        (err, comment) => {
            if (err)
                res.send(err);
            res.json(comment);
        }
    );
};

exports.update_review_comment = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");
    var dt = req.params.datetime;
    if (utils.emptyField(dt))
        return res.status(400).send("Missing comment id");

    Review.findOneAndUpdate(
        { "_id": id, "comments.datetime": dt },
        { $set: { "comments.$.text" : req.body.text }},
        (err, comment) => {
            if (err)
                res.send(err);
            res.json(comment);
        }
    );
};

exports.delete_review_post = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing review id");
    var dt = req.params.datetime;
    if (utils.emptyField(dt))
        return res.status(400).send("Missing comment id");

    Review.findByIdAndUpdate(
        id,
        {$pull: {comments: {datetime: dt}}},
        (err, review) => {
            if (err)
                res.send(err);
            res.send("Deleted");
        }
    );
};