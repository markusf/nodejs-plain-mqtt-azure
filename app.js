var mqtt = require('mqtt');

/*
  @url mqtts:// also working
  @username host/deviceId
  @password Partial SAS Key
  @clientId =deviceId, is required
*/
var client = mqtt.connect('ssl://yourhubname.azure-devices.net:8883', {
  username: 'yourhubname.azure-devices.net/device001',
  password: 'SharedAccessSignature sr=yourhubname.azure-devices.net%2fdevices%2fdevice001&sig=xm8kDAgQXgPuyoursig',
  clientId: 'device001'
});

client.on('connect', function() {

  console.log('connected');

  // qos optional
  client.subscribe('devices/device001/messages/devicebound/#', {qos: 1});

  client.on('message', function(topic, message, packet) {
    console.log("Received '" + message + "' on '" + topic + "'");
  });

  // qos optional
  client.publish('devices/device001/messages/events/', 'HelloWorld', {qos: 1}, function() {
    console.log('publish complete');
  });

});

client.on('error', function(err) {
  console.log(err);
});
