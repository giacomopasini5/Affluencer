module.export = function(mongoose) {
    var Schema = mongoose.Schema;
    var ClientSchema = new Schema({
        name: String,
        email: String,
        password: String,
        city: String,
        notifications: [{
            datetime: Date,
            text: String,
            read: Boolean
        }],
        status: Boolean
    });

    return mongoose.model('clientmodel', ClientSchema, 'Clients');
}