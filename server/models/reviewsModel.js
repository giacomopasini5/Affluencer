module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ReviewSchema = new Schema({
        client_id: mongoose.Types.ObjectId,
        shop_id: mongoose.Types.ObjectId,
        score: Number,
        title: String,
        text: String,
        comment: String
    });

    return mongoose.model('reviewmodel', ReviewSchema, 'Reviews');
}