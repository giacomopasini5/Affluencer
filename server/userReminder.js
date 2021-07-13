module.exports = function(App) {
    const moment = require('moment');
    const Reserv = App.models.Reservation;
    const Notif = App.models.Notification;

    async function remind() {
        var remDone = 0;
        var reservs = await Reserv.find({date: {$gt: new Date()}}).exec();
        for (const reserv of reservs) {
            if (!reserv.notified) {
                var d = moment(reserv.date);
                if (d.diff(moment(), 'm') <= 60) {
                    var txt = 'Reminder: '+reserv.people+' '+(reserv.people > 1 ? 'posti prenotati' : 'posto prenotato')+' oggi alle '+d.format('HH:mm')+' per '+reserv.shop_name;
                    var n = new Notif({
                        user_id: reserv.client_id,
                        text: txt,
                        url: '/',
                        read: false
                    });
                    n.save();
                    Reserv.findByIdAndUpdate(reserv._id, {notified: true}).exec();
                    remDone++;
                }
            }   
        }
        console.log("[" + new Date() + "] Generated " + remDone + " reminders");
    } 

    remind();
    setInterval(remind, 300000); // every 5 minutes
}