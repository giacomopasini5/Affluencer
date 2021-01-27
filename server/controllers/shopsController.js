const mongoose = require('mongoose');
const utils = require("../common.js");

var Shop = require("../models/shopsModel.js")(mongoose);

exports.list_shops = function(req, res) {
    Shop.find({}, (err, shops) => {
        if (err)
            res.send(err);
        res.json(shops);
    });
};

exports.create_shop = function(req, res) {
    if (req.body == null)
        return res.status(400).send("Empty body");

    (new Shop(newShop)).save((err, shop) => {
        if (err)
            res.json(err);
        res.status(201).json(shop);
    });
};

exports.get_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        return res.status(400).send("Missing id");

    Shop.findById(id, (err, shop) => {
        if (err || shop == null)
            res.status(404).send("Shop not found");

        res.json(shop);
    });
};

exports.update_shop = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing id");

    Shop.findOneAndUpdate(
        id,
        req.body,
        { new: true, useFindAndModify: false },
        (err, shop) => {
            if (err)
                res.send(err)
            res.json(shop);
        }
    )
};

exports.list_shop_posts = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing shop id");
    
    Shop.findById(id, "posts", (err, posts) => {
        if (err)
            res.send(err);
        res.json(posts);
    });
};

exports.create_shop_post = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing shop id");

    //Shop.update(id, { $push: { posts: req.body }})
    Shop.findByIdAndUpdate(
        id,
        { $push: { posts: req.body }},
        (err, shop) => {
            if (err)
                res.send(err);
            
            res.json(shop.posts[shop.posts.length-1]);
        }
    );
};

exports.get_shop_post = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing shop id");
    var dt = req.params.datetime;
    if (utils.emptyField(dt))
        res.status(400).send("Missing post id");

    Shop.findById(
        id,
        { posts: { $elemMatch: { datetime: dt }}},
        (err, post) => {
            if (err || post == null)
                res.send(err);
            res.json(post);
        }
    );
};

exports.update_shop_post = function(req, res) {
    var id = req.params.id;
    if (utils.emptyField(id))
        res.status(400).send("Missing shop id");
    var dt = req.params.datetime;
    if (utils.emptyField(dt))
        res.status(400).send("Missing post id");

    Shop.findOneAndUpdate(
        { "_id": id, "posts.datetime": dt },
        { $set: { "posts.$.text" : req.body.text }},
        (err, post) => {
            if (err)
                res.send(err);
            res.json(post);
        }
    );
};


