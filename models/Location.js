module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define(
        'Location',
        {
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
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            indexes: [
                {
                    name: 'coords_index',
                    fields: ['latitude', 'longitude']
                }
            ]
        }
    );

    return Location;
};
