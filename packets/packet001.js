//packet001
//Host Connection packet

module.exports = function(util, socket, me) {
    var _p = {};
    _p.serve = function(data) {
        //set client information passed form client
        me.un = data.userName;
        me.guid = data.guid;

        if (me.guid.length !== 8) {
            me.guid = util.generateGuid(8, function(x) {
                return (util.hostIndex(x) || util.clientIndex(x));
            });
            socket.emit('guid', me.guid);
        }

        if (!util.hostIndex(me.guid)) {//if the user is a not already a host
            //create session
            util.createSession(me, function() {
                socket.emit('refresh');
            });
        } else {
            console.error('Host ' + me.ip + ' already connected to another session');
        }
    };
    return _p;
};
