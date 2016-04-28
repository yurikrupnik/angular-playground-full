'use strict';

export default function(sequelize, DataTypes) {

    return sequelize.define('Outlay', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        // secondName: DataTypes.STRING,
        // age: DataTypes.NUMBER
        // amount: DataTypes.NUMBER,
        // date: DataTypes.DATE
    });
}
