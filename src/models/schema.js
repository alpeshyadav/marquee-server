const db = require("./db");
const Sequelize = require("sequelize");

const company = db.define(
    "company",
    {
        cin: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = company;
