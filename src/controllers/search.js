const htmlparser2 = require("htmlparser2");
const axios = require("axios");

const search = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { search } = req.body;
            if (!search.length) {
                return res.status(200).json({
                    data: "",
                    error: "Please provide input",
                    status: "error",
                });
            }
            try {
                const response = await axios.post(process.env.URL, {
                    search,
                    filter: "company",
                });
                const companyData = [];
                const parser = new htmlparser2.Parser({
                    onopentag(name, attributes) {
                        if (
                            name === "div" &&
                            attributes.id.startsWith("company")
                        ) {
                            companyData.push(
                                attributes.id.split("/").splice(1)
                            );
                        }
                    },
                });
                parser.write(response.data);
                parser.end();
                res.status(200).json({
                    data: companyData,
                    error: "",
                    status: "success",
                });
            } catch (error) {
                console.error(error);
            }
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

module.exports = search;
