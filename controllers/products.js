const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: "All Products Static" });
};

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "All Products" });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
