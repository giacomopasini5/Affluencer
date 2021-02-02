module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ClientSchema = new Schema({
        name: String,
        email: String,
        password: String,
        city: String,
        favoriteStores: [mongoose.Types.ObjectId],
        enabled: Boolean
    });

    return mongoose.model('clientmodel', ClientSchema, 'Clients');
}