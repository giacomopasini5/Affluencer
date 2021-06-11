module.exports = function(App) {
    const db = App.db;
    var obj = {};
    obj.Client = require("./clientsModel.js")(db);
    obj.Communication = require("./communicationsModel.js")(db);
    obj.Notification = require("./notificationsModel.js")(db);
    obj.Reservation = require("./reservationsModel.js")(db);
    obj.Review = require("./reviewsModel.js")(db);
    obj.Sensor = require("./sensorsModel.js")(db);
    obj.Shop = require("./shopsModel.js")(db);
    return obj;
}