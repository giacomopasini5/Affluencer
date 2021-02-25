module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var CommSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        client_id: mongoose.Types.ObjectId,
        datetime: Date,
        people_inside: Number,
        people_queue: Number
    });

    return mongoose.model('communicationmodel', CommSchema, 'Communications');
}