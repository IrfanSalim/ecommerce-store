const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const product = await Product.find({});
    res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    const product = await Product.find(queryObject);
    res.status(200).json({ product, nbhits: product.length });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
