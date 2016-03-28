var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;
var requ = require('request');

// here's a fake hardware device that we'll expose to HomeKit
var OUTLET = {
  powerOn: false,  
    
  setPowerOn: function(on) { 
    var status = "0";
    var url = 'http://192.168.178.29:3000/outlet/4/'
    console.log("Turning the light %s!", on ? "on" : "off");
    if(on){
      status  = "1";
    }
    OUTLET.powerOn = on;
    url += status;
  requ(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Modulus homepage.
      }
  });
  console.log(url);
  },
  identify: function() {
    console.log("Identify the light!");
  }
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "light".
var outletUUID = uuid.generate('hap-nodejs:accessories:Outlet');

// This is the Accessory that we'll return to HAP-NodeJS that represents our fake light.
var outlet = exports.accessory = new Accessory('OutletLivingroomTest', outletUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
outlet.username = "1A:2B:3C:4D:51:DC";
outlet.pincode = "031-45-154";

// set some basic properties (these values are arbitrary and setting them is optional)
outlet
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, "Oltica")
  .setCharacteristic(Characteristic.Model, "Rev-1")
  .setCharacteristic(Characteristic.SerialNumber, "A1S2NASF88EW");

// listen for the "identify" event for this Accessory
outlet.on('identify', function(paired, callback) {
  OUTLET.identify();
  callback(); // success
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
outlet
  .addService(Service.Outlet, "Steckdose Test") // services exposed to the user should have "names" like "Fake Light" for us
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    OUTLET.setPowerOn(value);
    callback(); // Our fake Light is synchronous - this value has been successfully set
  });

// We want to intercept requests for our current power state so we can query the hardware itself instead of
// allowing HAP-NodeJS to return the cached Characteristic.value.
outlet
  .getService(Service.Outlet)
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback) {
    
    // this event is emitted when you ask Siri directly whether your light is on or not. you might query
    // the light hardware itself to find this out, then call the callback. But if you take longer than a
    // few seconds to respond, Siri will give up.
    
    var err = null; // in case there were any problems
    
    if (OUTLET.powerOn) {
      console.log("Are we on? Yes. " + err);
      callback(err, true);
    }
    else {
      console.log("Are we on? No." + err);
      callback(err, false);
    }
  });

// also add an "optional" Characteristic for Brightness
/*outlet
  .getService(Service.Lightbulb)
  .addCharacteristic(Characteristic.Brightness)
  .on('get', function(callback) {
    callback(null, OUTLET.brightness);
  })
  .on('set', function(value, callback) {
    OUTLET.setBrightness(value);
    callback();
  })
*/