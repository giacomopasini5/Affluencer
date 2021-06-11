module.exports = function(App, server) {

    const ctrl = App.controllers;

    // SHOPS

    server.route('/api/shops')
        .get(ctrl.shops.list_shops)
        .post(ctrl.shops.create_shop);
    
    server.route('/api/shops/:id')
        .get(ctrl.shops.get_shop)
        .put(ctrl.shops.update_shop)
        //.delete(ctrl.shops.delete_shop);
    
    server.route('/api/shops/:id/posts')
        .get(ctrl.shops.list_shop_posts)
        .post(ctrl.shops.create_shop_post);
    
    server.route('/api/shops/:id/posts/:datetime')
        .get(ctrl.shops.get_shop_post)
        .put(ctrl.shops.update_shop_post)
        //.delete(ctrl.shops.delete_shop_post);

    // CLIENTS

    server.route('/api/clients')
        .get(ctrl.clients.list_clients)
        .post(ctrl.clients.create_client);

    server.route('/api/clients/:id')
        .get(ctrl.clients.get_client)
        .put(ctrl.clients.update_client)
        //.delete(ctrl.clients.delete_client);

    server.route('/api/clients/:id/favorite_shops')
        .get(ctrl.clients.list_client_favorite_shops)
        .post(ctrl.clients.add_client_favorite_shop);

    server.route('/api/clients/:id/favorite_shops/:shop_id')
        .delete(ctrl.clients.remove_client_favorite_shop);

    // SENSORS

    server.route('/api/sensors')
        .get(ctrl.sensors.list_shop_sensor_infos)
        .post(ctrl.sensors.create_shop_sensor_info);

    server.route('/api/sensors/:id')
        .get(ctrl.sensors.get_shop_sensor_infos)
        .put(ctrl.sensors.update_shop_sensor_infos);

    // NOTIFICATIONS

    server.route('/api/notifications/:user_id')
        .get(ctrl.notifications.list_user_notifications)
        .post(ctrl.notifications.create_user_notification);

    server.route('/api/notifications/:user_id/:id')
        .get(ctrl.notifications.get_user_notification)
        .put(ctrl.notifications.update_user_notification);

    // REVIEWS

    server.route('/api/reviews')
        .get(ctrl.reviews.list_reviews)
        .post(ctrl.reviews.create_review);

    server.route('/api/reviews/:id')
        .get(ctrl.reviews.get_review)
        .put(ctrl.reviews.update_review)
        .delete(ctrl.reviews.delete_review);

    server.route('/api/reviews/:id/:datetime')
        .get(ctrl.reviews.get_review_comment)
        .put(ctrl.reviews.update_review_comment)
        .delete(ctrl.reviews.delete_review_comment);

    // RESERVATIONS

    server.route('/api/reservations')
        .get(ctrl.reservations.list_reservations)
        .post(ctrl.reservations.create_reservation);

    server.route('/api/reservations/:id')
        .get(ctrl.reservations.get_reservation)
        .put(ctrl.reservations.update_reservation)
        .delete(ctrl.reservations.delete_reservation);

    // COMMUNICATIONS

    server.route('/api/communications')
        .get(ctrl.communications.list_communications)
        .post(ctrl.communications.create_communication);

    server.route('/api/communications/:id')
        .get(ctrl.communications.get_communication)
        .put(ctrl.communications.update_communication)
        .delete(ctrl.communications.delete_communication);

    server.route('/api/login')
        .post(ctrl.login.login);
};