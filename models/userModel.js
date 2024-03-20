import sequelize from '../db/db.js'
import { Model, DataTypes } from 'sequelize'

class User extends Model { }

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists" },
        validate: {
            isEmail: { msg: "Email is not valid" }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // doesn't work with sqlite
        len: {
            args: [10, 50],
            msg: "The password length should be between 10 and 50 characters"
        },
    },
    emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stringForRegistrationConfirmation: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: { msg: "WOW! Generated refresh token is not unique, try again pls" }
    }
}, {
    sequelize
    // validate: {
    //     combinedMessage() {
    //         // if ... 
    //         // throw new Error('all errors');
    //     }
    // }
});

export default User
