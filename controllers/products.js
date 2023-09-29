const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const product = await Product.find({});
    res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
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

    const result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createDate");
    }

    if (fields) {
        const fieldList = fields.split(",").join(" ");
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const products = await result;
    res.status(200).json({ products, nbhits: product.length });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
