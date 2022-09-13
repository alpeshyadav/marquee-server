const errorHandler = (err, req, res, next) => {
    console.error(err);
};

module.exports = { errorHandler };
