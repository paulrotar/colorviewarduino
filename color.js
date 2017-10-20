//Declaring requirements
var serialport = require('serialport');
var mongoose = require('mongoose');
var express = require('express');
var autoIncrement= require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
var url = "mongodb://pauldrot:parola1234@ds121575.mlab.com:21575/paulrotardb";
//var url = "mongodb://localhost:27017/colordb";
mongoose.connect(url);
var db = mongoose.connection;

autoIncrement.initialize(db);

db.once('open', function () {
    var ColorSchema = mongoose.Schema({
        color: String
    }, {
        timestamps: true
    });
    ColorSchema.plugin(autoIncrement.plugin, 'colorcode');
    var colorcode = db.model('colorcode', ColorSchema);
    var ColorData = mongoose.model('Colorcatched', ColorSchema);
    var portName = 'COM3';
    //Create a new object to collect the information
    var sp = new serialport(portName, {
        baudRate: 9600
        , parser: serialport.parsers.readline("\r\n")
    });
    //Create a new function, that outputs the content
    //that is sent from Arduino
    sp.on('data', function (input) {
        var color_rec = new ColorData({
            color: "#" + input 
        });
        color_rec.save(function (err, color_rec) {
            if (err) return console.error(err);
        });
        console.log(input);
    });
});