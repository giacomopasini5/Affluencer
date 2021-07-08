module.exports = async function(App) {
    const moment = require('moment');
    const mongoose = App.db;
    const Sensor = App.models.Sensor;
    const Shop = App.models.Shop;
    const Comm = App.models.Communication;
    const Reserv = App.models.Reservation;
    const Client = App.models.Client;

    var startDate = moment('2021-06-28');
    var endDate = moment();

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var query = Client.find({}, "_id name");
    var clients = await query.exec();
    
    Shop.find({}, "_id name openTime closeTime capacity").exec()
    .then(shops => {
        console.log('Generating data...');
        for (var curDate = moment(startDate); curDate.isBefore(endDate, 'm'); curDate.add(5, 'm')) {
            for (var i = 0; i < shops.length; i++) {
                var shop = shops[i];
                var openTime = moment(shop.openTime, "HH:mm");
                var closeTime = moment(shop.closeTime, "HH:mm");
                var capacity = shop.capacity;
                openTime.dayOfYear(curDate.dayOfYear());
                closeTime.dayOfYear(curDate.dayOfYear());
                if (openTime.hour() > closeTime.hour()) {
                    closeTime.add(1, 'd');
                }
                
                if (curDate.isBetween(openTime, closeTime)) {
                    var duration = moment.duration(closeTime.diff(openTime)).asMinutes();
                    var progress = moment.duration(curDate.diff(openTime)).minutes();
                    var firstPart = Math.ceil(duration * 0.1);
                    var lastPart = Math.ceil(duration * 0.9);
                    var curPeople = 0;
                    if (progress < firstPart) {
                        curPeople = Math.ceil((progress / firstPart) * capacity);
                    } else if (progress < lastPart) {
                        curPeople = capacity;
                    } else {
                        curPeople = capacity - Math.ceil((progress / duration) * capacity);
                    }
                    curPeople -= getRandomInt(Math.ceil(capacity / 4));
                    if (curPeople < 0) curPeople = 0;
                    var adjustedDate = curDate.clone().add(2, 'h');
                    var sensor = new Sensor({
                        shop_id: shop._id,
                        people_inside: curPeople,
                        timestamp: new Date(adjustedDate.valueOf())
                    });
                    sensor.save();

                    if (getRandomInt(100) <= 10) {
                        var idx = getRandomInt(clients.length-1);
                        var comm = new Comm({
                            shop_id: shop._id,
                            client_id: clients[idx]._id,
                            people_inside: curPeople,
                            people_queue: getRandomInt(10),
                            timestamp: new Date(adjustedDate.valueOf())
                        });
                        comm.save();

                        var d = curDate.clone();
                        idx = getRandomInt(clients.length-1);
                        var reserv = new Reserv({
                            shop_id: shop._id,
                            shop_name: shop.name,
                            client_id: clients[idx]._id,
                            client_name: clients[idx].name,
                            date: d.add(7, 'd').toDate(),
                            people: 1 + getRandomInt(9),
                            timestamp: new Date(adjustedDate.valueOf())
                        });
                        reserv.save();
                    }
                }
            }

        }
        console.log('Done!');
        process.exit();
    });
}