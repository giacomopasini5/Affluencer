module.exports = function(App) {
    const Reservation = App.models.Reservation;
    const utils = App.utils;
    const mongoose = App.db;
    var ctrl = {};

    ctrl.list_reservations = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var obj = null;
        if (!utils.emptyField(req.body.client_id)) {
            obj = {client_id: req.body.client_id};
        }
        if (!utils.emptyField(req.body.shop_id)) {
            obj = {shop_id: req.body.shop_id};
        }

        Reservation.find(obj, (err, reservations) => {
            if (err)
                return res.status(404).send(err);
            res.json(reservations);
        });
    };

    /*
    ctrl.list_client_reservations = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");

        Reservation.find({client_id: req.body.client_id}, (err, reservations) => {
            if (err)
                res.status(404).send(err);
            res.json(reservations);
        });
    };
    */

    ctrl.create_reservation = function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);
        body.client_id = mongoose.Types.ObjectId(body.client_id);

        (new Reservation(body)).save((err, reservation) => {
            if (err)
                return res.status(400).send(err);
            res.send("Created");
        });
    };

    ctrl.get_reservation = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Reservation.findById(id, (err, reservation) => {
            if (err || reservation == null)
                return res.status(404).send("Reservation not found: "+err);
            res.json(reservation);
        });
    };

    ctrl.update_reservation = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");

        Reservation.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
            (err, reservation) => {
                if (err)
                    return res.send(err)
                res.json(reservation);
            }
        );
    };

    ctrl.delete_reservation = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Reservation.findByIdAndRemove(id, (err, reservation) => {
            if (err)
                return res.send(err);
            res.send("Deleted");
        });
    }
    
    return ctrl;;
}