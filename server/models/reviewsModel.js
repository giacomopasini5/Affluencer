module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ReviewSchema = new Schema({
        client_id: mongoose.Types.ObjectId,
        shop_id: mongoose.Types.ObjectId,
        datetime: Date,
        text: String,
        comments: [{
            client_id: mongoose.Types.ObjectId,
            datetime: Date,
            text: String
        }]
    });

    return mongoose.model('reviewmodel', ReviewSchema, 'Reviews');
}