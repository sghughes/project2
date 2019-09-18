module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define('Location', {
        zipcode: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    return Location;
};
