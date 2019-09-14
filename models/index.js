'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {

    if (!process.env.DB_USER) {
        throw new Error("Missing DB user (DB_USER) in .env file!");
    } else if (!process.env.DB_PASS) {
        throw new Error("Missing DB password (DB_PASS) in .env file!");
    }

    var sequelize = new Sequelize(
        config.database,
        process.env.DB_USER,
        process.env.DB_PASS,
        config
    );
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
