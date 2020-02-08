var Push = require( 'pushover-notifications' )

module.exports = {
    notify: function (callback, message, title, sound, param_fw1) {
        var p = new Push( {
            user: process.env['PUSHOVER_USER'],
            token: process.env['PUSHOVER_TOKEN'],
        })

        var msg = {
            message: message,	// required
            title: title,
            sound: sound,
            device: 'IphoneXSTonio',
            priority: 1
        }
        new Promise(function (resolve, reject) {
            p.send( msg, function( err, result ) {
                if ( err ) {
                    reject(err);
                }
                resolve(result);
            })
        }).then(function(res){
            callback(null, res, param_fw1);
        }).catch(function(err) {
            callback(err, null, param_fw1);
        });
    }
}
