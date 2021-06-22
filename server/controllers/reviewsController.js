
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
            utils.addTimestampField(reviews);
            res.json(reviews);
        });
    };

    ctrl.create_review = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);

        (new Review(body)).save((err, review) => {
            if (err)
                return res.status(400).send(err);
            utils.addTimestampField(review);
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
            utils.addTimestampField(review);
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
                utils.addTimestampField(review);
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

    /*
    ctrl.list_review_comments = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Review.findById(id, "comments", (err, comments) => {
            if (err)
                return res.send(err);
            utils.addTimestampField(comments);
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

        Review.findByIdAndUpdate(
            id,
            { $push: { comments: body }},
            { new: true },
            (err, review) => {
                if (err)
                    return res.send(err);
                utils.addTimestampField(review.comments);
                res.json(review.comments);
            }
        );
    };

    ctrl.get_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var comment_id = req.params.comment_id;
        if (utils.emptyField(comment_id))
            return res.status(400).send("Missing comment id");

        Review.findById(
            id,
            { comments: { $elemMatch: { _id: mongoose.Types.ObjectId(comment_id) }}},
            (err, comment) => {
                if (err)
                    return res.send(err);
                utils.addTimestampField(comment);
                res.json(comment);
            }
        );
    };

    ctrl.update_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var comment_id = req.params.comment_id;
        if (utils.emptyField(comment_id))
            return res.status(400).send("Missing comment id");

        Review.findOneAndUpdate(
            {
                "_id": mongoose.Types.ObjectId(id),
                "comments._id": mongoose.Types.ObjectId(comment_id)
            },
            { $set: { "comments.$.text" : req.body.text }},
            (err, comment) => {
                if (err)
                    return res.send(err);
                    utils.addTimestampField(comment);
                res.json(comment);
            }
        );
    };

    ctrl.delete_review_comment = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing review id");
        var comment_id = req.params.comment_id;
        if (utils.emptyField(comment_id))
            return res.status(400).send("Missing comment id");

        Review.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: mongoose.Types.ObjectId(comment_id) }}},
            (err, review) => {
                if (err)
                    return res.send(err);
                res.send("Deleted");
            }
        );
    };
    */

    return ctrl;
}