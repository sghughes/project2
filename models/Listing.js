module.exports = function(sequelize, DataTypes) {
    var Listing = sequelize.define('Listing', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        itemQuality: DataTypes.STRING,
        properties: DataTypes.JSON,
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
        contactPhone: DataTypes.STRING,
        sellerId: DataTypes.STRING
    },{
        indexes: [
            {unique: true,
            fields: ['sellerId']}
        ]
    });

    return Listing;
};
