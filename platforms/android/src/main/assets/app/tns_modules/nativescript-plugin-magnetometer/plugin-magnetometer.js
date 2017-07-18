//var application =require('application');

var application = require('application');
var baseAcceleration = -9.81;
var sensorListener;
var sensorManager;
var magnetometerSensor;
function startMagnetometerUpdates(callback) {
    if (sensorListener) {
        throw new Error("Already listening for accelerometer updates.");
    }
    var activity = application.android.foregroundActivity;
    if (!activity) {
        throw Error("Could not get foregroundActivity.");
    }
    if (!sensorManager) {
        sensorManager = activity.getSystemService(android.content.Context.SENSOR_SERVICE);
        if (!sensorManager) {
            throw Error("Could not initalize SensorManager.");
        }
    }
    if (!magnetometerSensor) {
        magnetometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_MAGNETIC_FIELD);
        if (!magnetometerSensor) {
            throw Error("Could get accelerometer sensor.");
        }
    }
    sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: function (sensor, accuracy) {
        },
        onSensorChanged: function (event) {
            callback({
                x: event.values[0], /// baseAcceleration,
                y: event.values[1], /// baseAcceleration,
                z: event.values[2] /// baseAcceleration
                //magnitude: Math.sqrt(Math.pow(event.values[0],2)+Math.pow(event.values[1],2)+Math.pow(event.values[2],2))                
            });
        }
    });
    sensorManager.registerListener(sensorListener, magnetometerSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
}
exports.startMagnetometerUpdates = startMagnetometerUpdates;
function stopMagnetometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.");
    }
    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
exports.stopMagnetometerUpdates = stopMagnetometerUpdates;