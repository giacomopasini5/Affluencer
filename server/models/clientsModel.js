module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ClientSchema = new Schema({
        name: String,
        email: String,
        password: String,
        city: String,
        favorite_shops: [{
            _id: false,
            shop_id: mongoose.Types.ObjectId,
            shop_name: String
        }],
        enabled: Boolean
    });

    return mongoose.model('clientmodel', ClientSchema, 'Clients');
}