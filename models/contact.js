"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
      });
      Contact.hasMany(models.ContactInfo, {
        foreignKey: {
          allowNull: false,
          name: "contactId",
        },
      });
    }
  }
  Contact.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contact",
      underscored: true,
      tableName: "contacts",
    }
  );
  return Contact;
};
