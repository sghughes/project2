module.exports = function(sequelize, DataTypes) {
    var Distance = sequelize.define(
        'Distance',
        {
            zipcode: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            latSrc: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            lngSrc: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            latDest: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            lngDest: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            miles: {
                type: DataTypes.DOUBLE,
                allowNull: true
            }
        },
        {
            indexes: [
                {
                    name: 'dist_index',
                    fields: ['latSrc', 'lngSrc', 'latDest', 'lngDest']
                }
            ]
        }
    );

    return Distance;
};
