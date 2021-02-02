module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ResSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        client_id: mongoose.Types.ObjectId,
        datetime: Date,
        people: Number
    });

    return mongoose.model('reservationmodel', ResSchema, 'Reservations');
}