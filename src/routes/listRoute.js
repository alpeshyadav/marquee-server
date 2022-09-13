const { list } = require("../controllers");

const listRoute = (app) => {
  app.use("/list", list);
};

module.exports = listRoute;
