const { saveResult } = require("../controllers");

const saveRoute = (app) => {
    app.use("/save", saveResult);
};

module.exports = saveRoute;
