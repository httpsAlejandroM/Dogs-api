const { DataTypes, UUID, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("temperament", {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            alowNull: false,
            unique: true
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
          }
    }, { timestamps: false});
}