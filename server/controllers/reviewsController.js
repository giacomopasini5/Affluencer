
module.exports = function(App) {
    const Review = App.models.Review;
    const utils = App.utils;
    const mongoose = App.db;
    var ctrl = {};

    ctrl.list_reviews = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var obj = null;
        if (!utils.emptyField(req.body.client_id)) {
            var id = mongoose.Types.ObjectId(req.body.client_id);
            obj = {client_id: id};
        }
        if (!utils.emptyField(req.body.shop_id)) {
            var id = mongoose.Types.ObjectId(req.body.shop_id);
            obj = {shop_id: id};
        }

        Review.find(obj, (err, reviews) => {
            if (err)
                return res.status(404).send(err);
            res.json(reviews);
        });
    };

    /*
    ctrl.list_shop_reviews = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");

        Review.find({ shop_id: req.body.shop_id }, (err, reviews) => {
            if (err)
                res.status(404).send(err);
            res.json(reviews);
        });
    };
    */

    ctrl.create_review = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);
        body.datetime = new Date();

        (new Review(body)).save((err, review) => {
            if (err)
                return res.status(400).send(err);
            res.status(201).json(review);
        });
    };

    ctrl.get_review = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Review.findById(id, (err, review) => {
            if (err || review == null)
                return res.status(404).send("Review not found: "+err);
            res.json(review);
        });
    };

    ctrl.update_review = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");

        Review.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, review) => {
                if (err)
                    return res.send(err)
                res.json(review);
            }
        );
    };

    ctrl.delete_review = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Review.findByIdAndRemove(id, (err, review) => {
            if (err)
                return res.send(err);
            res.send("Deleted");
        });
    };

    ctrl.list_review_comments = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Review.findById(id, "comments", (err, comments) => {
            if (err)
                return res.send(err);
            res.json(comments);
        });
    };

    ctrl.create_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.datetime = new Date();

        Review.findByIdAndUpdate(
            id,
            { $push: { comments: body }},
            (err, review) => {
                if (err)
                    return res.send(err);
                res.json(review.comments);
            }
        );
    };

    ctrl.get_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing comment id");
        dt = new Date(dt);

        Review.findById(
            id,
            { comments: { $elemMatch: { datetime: dt }}},
            (err, comment) => {
                if (err)
                    return res.send(err);
                res.json(comment);
            }
        );
    };

    ctrl.update_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing comment id");
        dt = new Date(dt);

        Review.findOneAndUpdate(
            { "_id": id, "comments.datetime": dt },
            { $set: { "comments.$.text" : req.body.text }},
            (err, comment) => {
                if (err)
                    return res.send(err);
                res.json(comment);
            }
        );
    };

    ctrl.delete_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing review id");
        var dt = req.params.datetime;
        if (utils.emptyField(dt))
            return res.status(400).send("Missing comment id");
        dt = new Date(dt);

        Review.findByIdAndUpdate(
            id,
            {$pull: {comments: {datetime: dt}}},
            (err, review) => {
                if (err)
                    return res.send(err);
                res.send("Deleted");
            }
        );
    };

    return ctrl;
}