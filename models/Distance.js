module.exports = function(sequelize, DataTypes) {
    var Distance = sequelize.define('Distance', {
        zipSrc: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        zipDest: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        milesText: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        milesValue: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    return Distance;
};
