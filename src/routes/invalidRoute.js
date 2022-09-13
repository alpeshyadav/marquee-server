const invalidRoute = (app) => {
  app.use("*", (_, res) => {
    res.status(200).json({ message: "Oops! Invalid Route" });
  });
};

module.exports = invalidRoute;
