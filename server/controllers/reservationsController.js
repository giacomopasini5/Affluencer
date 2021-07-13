module.exports = function(App) {
    const Reservation = App.models.Reservation;
    const Client = App.models.Client;
    const Shop = App.models.Shop;
    const utils = App.utils;
    const mongoose = App.db;
    var ctrl = {};

    ctrl.list_reservations = function(req, res) {
        var obj = null;
        var set = false;
        if (!utils.emptyField(req.query.client_id)) {
            var id = req.query.client_id;
            obj = {client_id: mongoose.Types.ObjectId(id)};
            set = true;
        }
        if (!utils.emptyField(req.query.shop_id)) {
            var id = req.query.shop_id;
            obj = {shop_id: mongoose.Types.ObjectId(id)};
            set = true;
        }
        if (!set) {
            return res.status(400).send("Missing shop or client id");
        }

        Reservation.find(obj, (err, reservations) => {
            if (err)
                return res.status(404).send(err);
            //utils.addTimestampField(reservations);
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

    ctrl.create_reservation = async function(req, res) {
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        if (utils.emptyField(body.shop_id)) {
            return res.status(400).send("Missing shop id");
        }
        if (utils.emptyField(body.client_id)) {
            return res.status(400).send("Missing client id");
        }
        body.shop_id = mongoose.Types.ObjectId(body.shop_id);
        body.client_id = mongoose.Types.ObjectId(body.client_id);
        body.date = new Date(body.date);
        body.timestamp = new Date();
        body.notified = false;

        var client = await Client.findById(body.client_id, "name").exec();
        body.client_name = client.name;
        var shop = await Shop.findById(body.shop_id, "name").exec();
        body.shop_name = shop.name;

        (new Reservation(body)).save((err, reservation) => {
            if (err)
                return res.status(400).send(err);
            //utils.addTimestampField(reservation);
            res.send(reservation);
        });
    };

    ctrl.get_reservation = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");

        Reservation.findById(id, (err, reservation) => {
            if (err || reservation == null)
                return res.status(404).send("Reservation not found: "+err);
            //utils.addTimestampField(reservation);
            res.json(reservation);
        });
    };

    ctrl.update_reservation = function(req, res) {
        var id = req.params.id;
        if (utils.emptyField(id))
            return res.status(400).send("Missing id");
        if (req.body == null)
            return res.status(400).send("Empty body");
        var body = req.body;
        if (!utils.emptyField(body.date)) {
            body.date = new Date(body.date);
        }

        Reservation.findByIdAndUpdate(
            id,
            body,
            { new: true },
            (err, reservation) => {
                if (err)
                    return res.send(err)
                //utils.addTimestampField(reservation);
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
    
    return ctrl;
}