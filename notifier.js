var pm2 = require('pm2');

pm2.connect(function() {
    pm2.launchBus(function(err, bus) {
        bus.on('process:event', function(data) {
            console.log('data',data)
            if (data.event === "exit") {
                console.log('exit',data)
            }
        });
    });
});