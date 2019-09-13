module.exports = function(sequelize, DataTypes) {
    var Listing = sequelize.define('Listing', {
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isFree: DataTypes.BOOLEAN,
        contactZip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contactEmail: DataTypes.STRING,
        contactPhone: DataTypes.STRING
    });

    return Listing;
};
