const Sequelize = require("sequelize");

try {
    db = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: process.env.dialect,
        pool: {
            max: parseInt(process.env.max),
            min: parseInt(process.env.min),
            acquire: parseInt(process.env.acquire),
            idle: parseInt(process.env.idle),
        },
    });
} catch (error) {
    console.log(error);
}
module.exports = db;
