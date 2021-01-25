module.export = function(mongoose) {
    var Schema = mongoose.Schema;
    var CommSchema = new Schema({
        client_id: ObjectId,
        datetime: Date,
        people_inside: Number,
        people_queue: Number
    });

    return mongoose.model('communicationmodel', CommSchema, 'Communications');
}