module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ShopSchema = new Schema({
        name: String,
        email: String,
        password: String,
        address: String,
		city: String,
        category: String,
        capacity: Number,
        openTime: String,
        closeTime: String,
        location: {
            _id: false,
            type: {type: String},
            coordinates: [Number]
        },
        posts: [{
            title: String,
            text: String
        }],
        enabled: Boolean
    });

    return mongoose.model('shopmodel', ShopSchema, 'Shops');
}