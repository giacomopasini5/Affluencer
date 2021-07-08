module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ResSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        shop_name: String,
        client_id: mongoose.Types.ObjectId,
        client_name: String,
        date: Date,
        people: Number,
        timestamp: Date
    });

    return mongoose.model('reservationmodel', ResSchema, 'Reservations');
}