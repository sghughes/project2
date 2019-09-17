module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define('Location', {
        zipcode: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        longitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });

    return Location;
};
