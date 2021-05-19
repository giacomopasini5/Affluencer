module.exports = function(app) {
    var clientsController = require('../controllers/clientsController');
    var shopsController = require('../controllers/shopsController.js');
    var sensorsController = require('../controllers/sensorsController.js');
    var notificationsController = require('../controllers/notificationsController.js');
    var reviewsController = require('../controllers/reviewsController.js');
    var reservationsController = require('../controllers/reservationsController.js');
    var communicationsController = require('../controllers/communicationsController.js');

    var loginController = require('../controllers/loginController.js');

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

    // CLIENTS

    app.route('/api/clients')
        .get(clientsController.list_clients)
        .post(clientsController.create_client);

    app.route('/api/clients/:id')
        .get(clientsController.get_client)
        .put(clientsController.update_client)
        //.delete(clientsController.delete_client);

    app.route('/api/clients/:id/favorite_shops')
        .get(clientsController.list_client_favorite_shops)
        .post(clientsController.add_client_favorite_shop);

    app.route('/api/clients/:id/favorite_shops/:shop_id')
        .delete(clientsController.remove_client_favorite_shop);

    // SENSORS

    app.route('/api/sensors')
        .get(sensorsController.list_shop_sensor_infos)
        .post(sensorsController.create_shop_sensor_info);

    app.route('/api/sensors/:id')
        .get(sensorsController.get_shop_sensor_infos)
        .put(sensorsController.update_shop_sensor_infos);

    // NOTIFICATIONS

    app.route('/api/notifications/:user_id')
        .get(notificationsController.list_user_notifications)
        .post(notificationsController.create_user_notification);

    app.route('/api/notifications/:user_id/:id')
        .get(notificationsController.get_user_notification)
        .put(notificationsController.update_user_notification);

    // REVIEWS

    app.route('/api/reviews')
        .get(reviewsController.list_reviews)
        .post(reviewsController.create_review);

    app.route('/api/reviews/:id')
        .get(reviewsController.get_review)
        .put(reviewsController.update_review)
        .delete(reviewsController.delete_review);

    app.route('/api/reviews/:id/:datetime')
        .get(reviewsController.get_review_comment)
        .put(reviewsController.update_review_comment)
        .delete(reviewsController.delete_review_comment);

    // RESERVATIONS

    app.route('/api/reservations')
        .get(reservationsController.list_reservations)
        .post(reservationsController.create_reservation);

    app.route('/api/reservations/:id')
        .get(reservationsController.get_reservation)
        .put(reservationsController.update_reservation)
        .delete(reservationsController.delete_reservation);

    // COMMUNICATIONS

    app.route('/api/communications')
        .get(communicationsController.list_communications)
        .post(communicationsController.create_communication);

    app.route('/api/communications/:id')
        .get(communicationsController.get_communication)
        .put(communicationsController.update_communication)
        .delete(communicationsController.delete_communication);

    app.route('/api/login')
        .post(loginController.login);
};