// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        Password: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        UserRole: {
            type:DataTypes.STRING,
            allowNull: false
        },
        FlagNumber: {
            type: DataTypes.JSON
        },
        isRider: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isScorer: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        wToken: {
            type: DataTypes.STRING,
        },
        iToken: {
            type: DataTypes.STRING,
        },
        aToken: {
            type: DataTypes.STRING,
        }
    });

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
    };
    // Before a rider is created, we will automatically hash their password
    User.addHook("beforeCreate", user => {
    user.Password = bcrypt.hashSync(
        user.Password,
        bcrypt.genSaltSync(10),
        null
    );
    });

    return User;
};

