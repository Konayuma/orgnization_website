const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    clubPosition: {
        type: DataTypes.STRING
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Options
    tableName: 'members',
    timestamps: false
});

module.exports = Member;
