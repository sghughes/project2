module.exports = function(sequelize, DataTypes) {
    var ItemType = sequelize.define('ItemType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        properties: {
            type: DataTypes.JSON,
            allowNull: false
        }
    });

    return ItemType;
};
