module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var CommSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        client_id: mongoose.Types.ObjectId,
        people_inside: Number,
        people_queue: Number,
        timestamp: Date
    });

    return mongoose.model('communicationmodel', CommSchema, 'Communications');
}