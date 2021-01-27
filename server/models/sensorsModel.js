module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        client_id: ObjectId,
        datetime: Date,
        people_inside: Number
    });

    return mongoose.model('sensormodel', SensorSchema, 'Sensors');
}