module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ShopSchema = new Schema({
        name: String,
        email: String,
        password: String,
        address: String,
		city: String,
        capacity: Number,
        working_hours: {
            _id: false,
            opening: String,
            closing: String
        },
        /*
        working_hours: [{
            _id: false,
            day: String,
            hours: String
        }],
        */
        location: {
            _id: false,
            type: {type: String},
            coordinates: [Number]
        },
        posts: [{
            _id: false,
            datetime: Date,
            text: String
        }],
        enabled: Boolean
    });

    return mongoose.model('shopmodel', ShopSchema, 'Shops');
}