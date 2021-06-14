exports.emptyField = function(f) {
    return f == null || f == "";
}

exports.addTimestampField = function(object) {
    
    function addTimestamp(e) {
        e.timestamp = e._id.getTimestamp();
    }

    if (object instanceof Array) {
        var idx;
        for (idx = 0; idx < object.length; idx++) {
            addTimestamp(object[idx]);
        }
    } else {
        addTimestamp(object);
    }
}