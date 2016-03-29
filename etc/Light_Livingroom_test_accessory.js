var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;
var requ = require('request');

// here's a fake hardware device that we'll expose to HomeKit
var FAKE_LIGHT = {
  powerOn: false,
  brightness: 100, // percentage
	  
  setPowerOn: function(on) { 
  	var url = 'http://192.168.178.22:3000/signal/'
    var signal = on ? "on" : "off";
    console.log("Turning the light %s!", signal);
    FAKE_LIGHT.powerOn = on;
    url += signal;
    console.log(url);
    requ(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
      }
    });
  },
  setBrightness: function(brightness) {
    console.log("Setting light brightness to %s", brightness);
    var url = 'http://192.168.178.22:3000/brightness/' + brightness;
    requ(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Modulus homepage.
      }
    });
    FAKE_LIGHT.brightness = brightness;
  },
  setHue: function(hue) {
    console.log("Setting light Brightness Hue to %s", hue);
    var url = 'http://192.168.178.22:3000/color/' + hue;
    requ(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body); // Show the HTML for the Modulus homepage.
      }
    });
    FAKE_LIGHT.hue = hue;
  },
  identify: function() {
    console.log("Identify the light!");
  }
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "light".
var lightUUID = uuid.generate('hap-nodejs:accessories:light');

// This is the Accessory that we'll return to HAP-NodeJS that represents our fake light.
var light = exports.accessory = new Accessory('Testlight', lightUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
light.username = "1A:2B:3C:4D:5E:00";
light.pincode = "031-45-154";

// set some basic properties (these values are arbitrary and setting them is optional)
light
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, "Oltica")
  .setCharacteristic(Characteristic.Model, "Rev-1")
  .setCharacteristic(Characteristic.SerialNumber, "A1S2NASF88EW");

// listen for the "identify" event for this Accessory
light.on('identify', function(paired, callback) {
  FAKE_LIGHT.identify();
  callback(); // success
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
light
  .addService(Service.Lightbulb, "Testlicht") // services exposed to the user should have "names" like "Fake Light" for us
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    FAKE_LIGHT.setPowerOn(value);
    callback(); // Our fake Light is synchronous - this value has been successfully set
  });

// We want to intercept requests for our current power state so we can query the hardware itself instead of
// allowing HAP-NodeJS to return the cached Characteristic.value.
light
  .getService(Service.Lightbulb)
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback) {
    
    // this event is emitted when you ask Siri directly whether your light is on or not. you might query
    // the light hardware itself to find this out, then call the callback. But if you take longer than a
    // few seconds to respond, Siri will give up.
    
    var err = null; // in case there were any problems
    
    if (FAKE_LIGHT.powerOn) {
      console.log("Are we on? Yes. " + err);
      callback(err, true);
    }
    else {
      console.log("Are we on? No." + err);
      callback(err, false);
    }
  });

// also add an "optional" Characteristic for Brightness
light
  .getService(Service.Lightbulb)
  .addCharacteristic(Characteristic.Brightness)
  .on('get', function(callback) {
    callback(null, FAKE_LIGHT.brightness);
  })
  .on('set', function(value, callback) {
    FAKE_LIGHT.setBrightness(value);
    callback();
  });

// also add an "optional" Characteristic for Hue
light
  .getService(Service.Lightbulb)
  .addCharacteristic(Characteristic.Hue)
  .on('get', function(callback) {
    callback(null, FAKE_LIGHT.hue);
  })
  .on('set', function(value, callback) {
    FAKE_LIGHT.setHue(value);
    callback();
  });
