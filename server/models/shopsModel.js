module.export = function(mongoose) {
    var Schema = mongoose.Schema;
    var ShopSchema = new Schema({
        name: String,
        email: String,
        password: String,
        address: String,
		city: String,
        capacity: Number,
        working_hours: [{
            day: String,
            hour: String,
        }],
        location: {
            type: String,
            coordinates: [Number]
        },
        posts: [{
            datetime: Date,
            text: String
        }],
        enabled: Boolean
    });

    return mongoose.model('shopmodel', ShopSchema, 'Shops');
}