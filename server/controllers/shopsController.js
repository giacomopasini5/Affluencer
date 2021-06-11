module.exports = function(App) {
    const Shop = App.models.Shop;
    const utils = App.utils;
    const bcrypt = require('bcrypt');
    const saltRound = 10;
    var ctrl = {};

    ctrl.list_shops = function(req, res) {
        Shop.find({}, (err, shops) => {
            if (err)
                return res.send(err);
            res.json(shops);
        });
    };

    ctrl.create_shop = function(req, res) {
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
                res.json(shop);
            }
        );
    };

    ctrl.list_shop_posts = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        
        Shop.findById(id, "posts", (err, posts) => {
            if (err)
                return res.send(err);
            res.json(posts);
        });
    };

    ctrl.create_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");

        //Shop.update(id, { $push: { posts: req.body }})
        Shop.findByIdAndUpdate(
            id,
            { $push: { posts: req.body }},
            (err, shop) => {
                if (err)
                    return res.send(err);
                res.json(shop.posts[shop.posts.length-1]);
            }
        );
    };

    ctrl.get_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing post id");

        Shop.findById(
            id,
            { posts: { $elemMatch: { datetime: dt }}},
            (err, post) => {
                if (err || post == null)
                    return res.send(err);
                res.json(post);
            }
        );
    };

    ctrl.update_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing post id");

        Shop.findOneAndUpdate(
            { "_id": id, "posts.datetime": dt },
            { $set: { "posts.$.text" : req.body.text }},
            (err, post) => {
                if (err)
                    return res.send(err);
                res.json(post);
            }
        );
    };

    ctrl.delete_shop_post = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing shop id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing post id");

        Shop.findByIdAndUpdate(
            id,
            { $pull: { posts: { datetime: dt }}},
            (err, post) => {
                if (err)
                    return res.send(err);
                res.send("Deleted");
            }
        );
    };

    return ctrl;
}