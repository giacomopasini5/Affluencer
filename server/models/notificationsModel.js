module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var NotifSchema = new Schema({
        user_id: mongoose.Types.ObjectId,
        text: String,
        url: String,
        read: Boolean
    });

    return mongoose.model('notificationmodel', NotifSchema, 'Notifications');
}