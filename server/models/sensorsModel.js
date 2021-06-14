module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        people_inside: Number
    });

    return mongoose.model('sensormodel', SensorSchema, 'Sensors');
}