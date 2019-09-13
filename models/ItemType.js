module.exports = function(sequelize, DataTypes) {
    var ItemType = sequelize.define(
        'ItemType',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            properties: {
                type: DataTypes.JSON,
                allowNull: false
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    name: 'NAME_CATEGORY',
                    fields: ['name', 'category']
                }
            ]
        }
    );

    ItemType.associate = models => {
        ItemType.hasOne(models.Item, {
            as: 'Type'
        });
    };

    return ItemType;
};
