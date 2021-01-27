module.exports = function(app) {
    var clientsController = require('../controllers/clientsController');
    var shopsController = require('../controllers/shopsController.js');

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

    
};