module.exports = function(App) {
    const Shop = App.models.Shop;
    const Sensor = App.models.Sensor;
    const utils = App.utils;
    const mongoose = App.db;
    const bcrypt = require('bcrypt');
    const saltRound = 10;
    var ctrl = {};

    ctrl.list_shops = function(req, res) {
        Shop.find({}).sort('name').exec((err, shops) => {
            if (err)
                return res.send(err);
            res.json(shops);
        });
    };

    ctrl.create_shop = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        if (body.coordinates != null) {
            body.location = {
                type: "Point",
                coordinates: body.coordinates
            };
        }
        body.enabled = true;

        bcrypt.genSalt(saltRound)
        .then(salt => {
            return bcrypt.hash(body.password, salt);
        })
        .then(hash => {
            body.password = hash;
            (new Shop(body)).save((err, shop) => {
                if (err)
                    res.json(err);
                res.status(201).json({
                    id: shop._id,
                    username: shop.email,
                    usertype: 'shop'
                }); 
            });
        });
    };

    ctrl.get_shop = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Shop.findById(id, (err, shop) => {
            if (err || shop == null)
                return res.status(404).send("Shop not found");
            res.json(shop);
        });
    };

    ctrl.get_shop_short_info = function(req, res) {
        var id = req.params.id;
        var json = {};
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Shop.findById(id, "-email -password -posts", (err, shop) => {
            if (err || shop == null)
                return res.status(404).send("Shop not found");
            Object.assign(json, shop._doc);

            Sensor.find({shop_id: shop._id}).sort({ _id: -1}).limit(1)
            .exec()
            .then(sensor => {
                if (sensor == null)
                    return res.send("Sensor error");
                json.lastSensorActivity = sensor;
                res.json(json);
            });
        });
    }

    ctrl.update_shop = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        
        Shop.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, shop) => {
                if (err)
                    return res.send(err)
                //utils.addTimestampField(shop.posts);
                res.json(shop);
            }
        );
    };

    ctrl.list_shop_posts = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        
        Shop.findById(id, "posts", (err, shop) => {
            if (err)
                return res.send(err);
            utils.addTimestampField(shop.posts);
            res.json(shop.posts);
        });
    };

    ctrl.create_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");

        Shop.findByIdAndUpdate(
            id,
            { $push: { posts: req.body }},
            { new: true },
            (err, shop) => {
                if (err)
                    return res.send(err);
                utils.addTimestampField(shop.posts[0]);
                res.json(shop.posts[0]);
            }
        );
    };

    ctrl.get_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var post_id = req.params.post_id;
        if (utils.emptyField(post_id))
            return res.status(400).send("Missing post id");

        Shop.findById(
            id,
            { posts: { $elemMatch: { _id: mongoose.Types.ObjectId(post_id) }}},
            (err, shop) => {
                if (err || shop == null)
                    return res.send(err);
                utils.addTimestampField(shop.posts[0]);
                res.json(shop.posts[0]);
            }
        );
    };

    ctrl.update_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var post_id = req.params.post_id;
        if (utils.emptyField(post_id))
            return res.status(400).send("Missing post id");

        Shop.findOneAndUpdate(
            {
                "_id": mongoose.Types.ObjectId(id),
                "posts._id": mongoose.Types.ObjectId(post_id)
            },
            { $set: { "posts.$.text" : req.body.text }},
            { new: true },
            (err, shop) => {
                if (err)
                    return res.send(err);
                var post = shop.posts[shop.posts.length-1];
                utils.addTimestampField(post);
                res.json(post);
            }
        );
    };

    ctrl.delete_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var post_id = req.params.post_id;
        if (utils.emptyField(post_id))
            return res.status(400).send("Missing post id");

        Shop.findByIdAndUpdate(
            id,
            { $pull: { posts: { _id: mongoose.Types.ObjectId(post_id) }}},
            (err, post) => {
                if (err)
                    return res.send(err);
                res.send("Deleted");
            }
        );
    };

    return ctrl;
}