module.exports = function(app) {
    var clientsController = require('../controllers/clientsController');

    app.route('/api/clients')
        .get(clientsController.list_clients)
        .post(clientsController.create_client);

    app.route('/api/clients/:id')
        .get(clientsController.read_client)
        .post(clientsController.update_client)
        .delete(clientsController.delete_client);
};