module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ResSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        client_id: mongoose.Types.ObjectId,
        date: Date,
        people: Number,
        timestamp: Date
    });

    return mongoose.model('reservationmodel', ResSchema, 'Reservations');
}