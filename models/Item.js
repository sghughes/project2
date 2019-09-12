module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define('Item', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        condition: DataTypes.STRING
    });

    return Item;
};
