module.export = function(mongoose) {
    var Schema = mongoose.Schema;
    var NotifSchema = new Schema({
        user_id: ObjectId,
        datetime: Date,
        text: String,
        read: Boolean
    });

    return mongoose.model('notificationmodel', NotifSchema, 'Notifications');
}