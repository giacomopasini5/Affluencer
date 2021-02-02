module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        datetime: Date,
        people_inside: Number
    });

    return mongoose.model('sensormodel', SensorSchema, 'Sensors');
}