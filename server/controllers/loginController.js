const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Client } = require("../controllers/clientsController");
const { Shop } = require("../controllers/shopsController.js");

exports.login = function(req, res) {
    if (req.body.usertype == 'client') {
        let email2 = req.body.email;
        let password = req.body.password;

        Client.findOne(
            { email: email2 },
            "_id, password",
            (err, client) => {
                if (err)
                    res.send(err);

                bcrypt.compare(password, client.password)
                .then(result => {
                    if (result) {
                        return res.json({
                            id: client._id,
                            username: email2,
                            usertype: 'client'
                        });
                    } else {
                        return res.status(404).send('User not found');
                    }
                });
            }
        );

    } else if (req.body.usertype == 'shop') {
        let email2 = req.body.email;
        let password = req.body.password;
        
        Shop.findOne(
            { email: email2 },
            "_id, password",
            (err, shop) => {
                if (err)
                    res.send(err);
                
                bcrypt.compare(password, shop.password)
                .then(result => {
                    if (result) {
                        return res.json({
                            id: shop._id,
                            username: email2,
                            usertype: 'shop'
                        });
                    } else {
                        return res.status(404).send('User not found');
                    }
                });
            }
        );
    }
};
