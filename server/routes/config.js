module.exports = function(app) {
    var clientsController = require('../controllers/clientsController');
    var shopsController = require('../controllers/shopsController.js');
    var sensorsController = require('../controllers/sensorsController.js');
    var notificationsController = require('../controllers/notificationsController.js');

    // CLIENTS
    app.route('/api/clients')
        .get(clientsController.list_clients)
        .post(clientsController.create_client);

    app.route('/api/clients/:id')
        .get(clientsController.get_client)
        .put(clientsController.update_client)
        //.delete(clientsController.delete_client);
    
    // SHOPS
    app.route('/api/shops')
        .get(shopsController.list_shops)
        .post(shopsController.create_shop);
    
    app.route('/api/shops/:id')
        .get(shopsController.get_shop)
        .put(shopsController.update_shop)
        //.delete(shopsController.delete_shop);
    
    app.route('/api/shops/:id/posts')
        .get(shopsController.list_shop_posts)
        .post(shopsController.create_shop_post);
    
    app.route('/api/shops/:id/posts/:datetime')
        .get(shopsController.get_shop_post)
        .put(shopsController.update_shop_post)
        //.delete(shopsController.delete_shop_post);

    // SENSORS
    app.route('/api/sensors/:shop_id')
        .get(sensorsController.list_shop_sensor_infos)
        .post(sensorsController.create_shop_sensor_info);

    app.route('/api/sensors/:shop_id/:id')
        .get(sensorsController.get_shop_sensor_infos)
        .put(sensorsController.update_shop_sensor_infos);

    // NOTIFICATIONS
    app.route('/api/notifications/:user_id')
        .get(notificationsController.list_user_notifications)
        .post(notificationsController.create_user_notification);

    app.route('/api/notifications/:user_id/:id')
        .get(notificationsController.get_user_notification)
        .put(notificationsController.update_user_notification);

    
};