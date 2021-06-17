exports.emptyField = function(f) {
    return f == undefined || f == null || f == "";
}

exports.addTimestampField = function(object) {
    
    function addTimestamp(doc) {
        doc.timestamp = doc._id.getTimestamp();
    }

    if (object instanceof Array) {
        var idx;
        for (idx = 0; idx < object.length; idx++) {
            addTimestamp(object[idx]._doc);
        }
    } else {
        addTimestamp(object._doc);
    }
}