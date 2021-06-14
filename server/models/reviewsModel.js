module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ReviewSchema = new Schema({
        client_id: mongoose.Types.ObjectId,
        shop_id: mongoose.Types.ObjectId,
        score: Number,
        text: String,
        comments: [{
            client_id: mongoose.Types.ObjectId,
            text: String
        }]
    });

    return mongoose.model('reviewmodel', ReviewSchema, 'Reviews');
}