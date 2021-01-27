module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ReviewSchema = new Schema({
        client_id: ObjectId,
        shop_id: ObjectId,
        datetime: Date,
        text: String,
        comments: [{
            client_id: ObjectId,
            datetime,
            text: String
        }]
    });

    return mongoose.model('reviewmodel', ReviewSchema, 'Reviews');
}