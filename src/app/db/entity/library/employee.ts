import {
    Sequelize,
    DataTypes,
    IntegerDataType
} from 'sequelize';

export default (sequelize: Sequelize, DataTypes) => {
    var Employee = sequelize.define('Employee', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobilNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Employee
};
