module.exports = function(sequelize, DataTypes) {
    var ItemType = sequelize.define('ItemType', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        properties: {
            type: DataTypes.JSON,
            allowNull: false
        }
    });

    ItemType.associate = models => ItemType.hasOne(models.Listing, {
        defaultValue: 'clothing'
    });

    return ItemType;
};
