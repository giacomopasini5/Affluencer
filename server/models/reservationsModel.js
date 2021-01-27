module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ResSchema = new Schema({
        shop_id: ObjectId,
        client_id: ObjectId,
        datetime: Date,
        people: Number
    });

    return mongoose.model('reservationmodel', ResSchema, 'Reservations');
}