module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        shop_id: mongoose.Types.ObjectId,
        people_inside: Number,
        timestamp: Date
    });

    return mongoose.model('sensormodel', SensorSchema, 'Sensors');
}