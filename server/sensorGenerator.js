module.exports = function(App) {
    const moment = require('moment');
    const mongoose = App.db;
    const Sensor = App.models.Sensor;
    const Shop = App.models.Shop;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function generate() {
        Shop.find({}, "_id openTime closeTime capacity").exec()
        .then(res => {
            var idx;
            var updated = 0;
            for (idx = 0; idx < res.length; idx++) {
                var shop = res[idx];
                var openTime = moment(shop.openTime, "HH:mm");
                var closeTime = moment(shop.closeTime, "HH:mm");
                if (openTime.hour() > closeTime.hour()) {
                    closeTime.add(1, 'd');
                }
                if (moment().isBetween(openTime, closeTime)) {
                    var sensor = new Sensor({
                        shop_id: shop._id,
                        people_inside: getRandomInt(shop.capacity),
                        timestamp: new Date()
                    });
                    sensor.save();
                    updated++;
                }
            }
            console.log("[" + new Date() + "] Generated crowd influx for " + updated + " shops");
        });
    }

    generate();
    setInterval(generate, 60000); // every 60 seconds
}