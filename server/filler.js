module.exports = function(App) {
    const moment = require('moment');
    const mongoose = App.db;
    const Sensor = App.models.Sensor;
    const Shop = App.models.Shop;
    const Comm = App.models.Communication;
    const Reserv = App.models.Reservation;
    const Client = App.models.Client;

    var startDate = moment('2021-07-05 00:00:00');
    var endDate = moment();

    var sensorSaves = 0, comSaves = 0, reservSaves = 0;
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    async function generate() {
        console.log('> DATABASE FILLER INITIATED <')
        console.log('startDate: '+startDate.format());
        console.log('endDate: '+endDate.format());

        var query = Client.find({});
        var clients = await query.exec();
        console.log(clients.length + ' clients found');
        
        Shop.find({}).exec()
        .then(shops => {
            console.log(shops.length + ' shops found');
            console.log('Generating data...');
            for (var curDate = moment(startDate); curDate.isBefore(endDate, 'm'); curDate.add(5, 'm')) {
                //console.log('> curDate: '+curDate.format());
                for (var i = 0; i < shops.length; i++) {
                    var shop = shops[i];
                    var openTime = moment(shop.openTime, "HH:mm");
                    var closeTime = moment(shop.closeTime, "HH:mm");
                    var capacity = shop.capacity;
                    //console.log('before: OT '+openTime.format()+' CT '+closeTime.format());
                    openTime.dayOfYear(curDate.dayOfYear());
                    closeTime.dayOfYear(curDate.dayOfYear());
                    //console.log('after DoY: OT '+openTime.format()+' CT '+closeTime.format());
                    if (openTime.hour() > closeTime.hour()) {
                        closeTime.add(1, 'd');
                    }
                    //console.log('after add: OT '+openTime.format()+' CT '+closeTime.format()+"\n");
                    
                    if (curDate.isBetween(openTime, closeTime)) {
                        var duration = moment.duration(closeTime.diff(openTime)).asMinutes();
                        var progress = moment.duration(curDate.diff(openTime)).asMinutes();
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
                        //var adjustedDate = curDate.clone().add(2, 'h');
                        var sensor = new Sensor({
                            shop_id: shop._id,
                            people_inside: curPeople,
                            timestamp: curDate.toDate()
                        });
                        sensor.save();
                        sensorSaves++;

                        if (getRandomInt(100) < 5) {
                            var idx = getRandomInt(clients.length-1);
                            var comm = new Comm({
                                shop_id: shop._id,
                                client_id: clients[idx]._id,
                                people_inside: curPeople,
                                people_queue: getRandomInt(10),
                                timestamp: curDate.toDate()
                            });
                            comm.save();
                            comSaves++;
                        }

                        if (getRandomInt(1000) < 5) {
                            var d = curDate.clone();
                            var idx = getRandomInt(clients.length-1);
                            var reserv = new Reserv({
                                shop_id: shop._id,
                                shop_name: shop.name,
                                client_id: clients[idx]._id,
                                client_name: clients[idx].name,
                                date: d.add(7, 'd').toDate(),
                                people: 1 + getRandomInt(4),
                                notified: false,
                                timestamp: curDate.toDate()
                            });
                            reserv.save();
                            reservSaves++;
                        }
                    }
                }
            }
            console.log('Done! Generated '+sensorSaves+' sensor rows, '+comSaves+' communication rows and '+reservSaves+' reservations rows');
            console.log('You can terminate the process');
        });
    }

    generate();
}