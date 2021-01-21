module.export = function(mongoose) {
    var Schema = mongoose.Schema;
    var ShopSchema = new Schema({
        name: String,
        email: String,
        password: String,
        address: String,
        location: {
            type: String,
            coordinates: [Number]
        },
        capacity: Number,
        posts: [{
            datetime: Date,
            text: String
        }],
        reservations: [{
            client_id: ObjectId,
            datetime: Date
        }],
        comments: [{
            client_id: ObjectId,
            datetime: Date
        }],
        communications: [{
            datetime: Date,
            client_id: ObjectId,
            people_inside: Number,
            people_in_queue: Number
        }],
        sensor_data: [{
            datetime: Date,
            people_inside: Number
        }],
        notifications: [{
            datetime: Date,
            text: String,
            read: Boolean
        }],
        status: Boolean
    });

    return mongoose.model('shopmodel', ShopSchema, 'Shops');
}