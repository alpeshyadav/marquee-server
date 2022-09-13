const invalidRoute = require("./invalidRoute");
const listRoute = require("./listRoute");
const saveRoute = require("./saveRoute");
const searchRoute = require("./searchRoute");

const routes = (app) => {
    listRoute(app);
    saveRoute(app);
    searchRoute(app);
    invalidRoute(app);
};

module.exports = { routes };
