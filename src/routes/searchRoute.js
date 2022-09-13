const { search } = require("../controllers");

const searchRoute = (app) => {
  app.use("/search", search);
};

module.exports = searchRoute;
