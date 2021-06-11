module.exports = function(App) {
    var obj = {};
    obj.clients = require('./clientsController.js')(App);
    obj.communications = require('./communicationsController.js')(App);
    obj.login = require('./loginController.js')(App);
    obj.notifications = require('./notificationsController.js')(App);
    obj.reservations = require('./reservationsController.js')(App);
    obj.reviews = require('./reviewsController.js')(App);
    obj.sensors = require('./sensorsController.js')(App);
    obj.shops = require('./shopsController.js')(App);
    return obj;
}