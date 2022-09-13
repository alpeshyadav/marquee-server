const { company } = require("../models");

const list = async (req, res) => {
    if (req.method === "GET") {
        try {
            const allData = await company.findAll();
            res.status(200).json({
                data: allData,
                error: "",
                status: "success",
            });
        } catch (error) {
            return res.status(200).json({
                data: "",
                error: "Sometthing went wrong. Please try again",
                status: "error",
            });
        }
    } else {
        res.status(200).json({
            data: "",
            error: "Invalid http verb",
            status: "error",
        });
    }
};

module.exports = list;
