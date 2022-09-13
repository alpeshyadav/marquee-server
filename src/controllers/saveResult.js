const htmlparser2 = require("htmlparser2");
const axios = require("axios");
const { company } = require("../models");

const saveResult = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { cin } = req.body;
            if (!cin.length) {
                return res.status(200).json({
                    data: "",
                    error: "Please provide input",
                    status: "error",
                });
            }
            const alreadyInDB = await company.findByPk(cin);
            if (alreadyInDB) {
                return res.status(200).json({
                    data: "",
                    error: "data already exists!",
                    status: "error",
                });
            }

            const response = await axios.post(process.env.URL, {
                search: cin,
                filter: "company",
            });
            const companyData = {};
            const parser = new htmlparser2.Parser({
                onopentag(name, attributes) {
                    if (name === "div" && attributes.id.startsWith("company")) {
                        const data = attributes.id.split("/");
                        companyData.name = data[1].split("-").join(" ");
                        companyData.cin = data[2];
                    }
                },
            });
            parser.write(response.data);
            parser.end();

            try {
                await company.create(companyData);
            } catch (error) {
                return res.status(200).json({
                    data: "",
                    error: "Something went wrong. Please try again",
                    status: "error",
                });
            }

            res.status(200).json({
                data: "Saved scuccessfully",
                error: "",
                status: "success",
            });
        } else {
            res.status(200).json({
                data: "",
                error: "Invalid http verb",
                status: "error",
            });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = saveResult;
