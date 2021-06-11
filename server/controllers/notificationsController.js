module.exports = function(App) {
    const Notification = App.models.Notification;
    const utils = App.utils;
    var ctrl = {};

    ctrl.list_user_notifications = function(req, res) {
        var id = req.body.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing user id");

        Notification.find(
            {user_id: mongoose.Types.ObjectId(id)},
            (err, notifications) => {
                if (err || notifications == null)
                    res.send(err);
                res.json(notifications);
            }
        );    
    };

    ctrl.create_user_notification = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.user_id = mongoose.Types.ObjectId(body.user_id);

        (new Notification(body)).save((err, notification) => {
            if (err)
                return res.json(err);
            res.status(201).json(notification);
        });
    };

    ctrl.get_user_notification = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var user_id = req.params.user_id;
        if (utils.emptyField(user_id))
            return res.status(400).send("Missing user id");

        Notification.findById(id, (err, notification) => {
            if (err)
                return res.json(err);
            res.json(notification);
        });
    };

    ctrl.update_user_notification = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        var user_id = req.params.user_id;
        if (utils.emptyField(user_id))
            return res.status(400).send("Missing user id");

        Notification.findByIdAndUpdate(
            id,
            req.body,
            {new: true},
            (err, notification) => {
                if (err)
                    return res.json(err);
                res.json(notification);
            }
        );
    };

    ctrl.delete_user_notification = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Notification.findByIdAndRemove(id, (err, notif) => {
            if (err)
                return res.send(err);
            res.send("Deleted");
        });
    };

    return ctrl;
}