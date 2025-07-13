const ProductService = require('../services/ProductService');

// [GET] /product/getProducts
const getProducts = async (req, res) => {
    try {
        const {
            limit,
            page,
            sort,
            nameProduct,
            category,
            color,
            size,
            minPrice,
            maxPrice
        } = req.query

        const products = await ProductService.getProducts(
            Number(limit) || 8,
            Number(page) || 1,
            sort,
            nameProduct,
            category,
            color,
            size,
            minPrice,
            maxPrice
        );
        res.json(products)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [GET] /product/getProduct/:id
const getProductById = async (req, res) => {
    try {
        const ProductId = req.params.id

        if (!ProductId) {
            return res.status(404).json({
                status: 'Error',
                message: 'ProductId not found'
            })
        }

        const product = await ProductService.getProductById(ProductId);
        res.json(product)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



// [POST] /product/create
const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductService.createProduct(req.body);
        res.json(newProduct)
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// [PUT] /product/update/:id
const updateProduct = async (req, res) => {
    try {
        // Get ID from URL
        const ProductId = req.params.id
        const data = req.body
        if (!ProductId) {
            return res.status(400).json({
                status: 'Error',
                message: 'The ProductId is not found'
            })
        }

        const updateProduct = await ProductService.updateProduct(ProductId, data)

        if (!updateProduct) {
            return res.status(404).json({
                status: 'Error',
                message: 'The ProductId not found'
            })
        }
        return res.status(200).json(updateProduct)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// [DELETE] /product/delete/:id
const deleteProduct = async (req, res) => {
    try {
        const ProductId = req.params.id

        if (!ProductId) {
            return res.status(404).json({
                status: 'Error',
                message: 'The ProductId not found'
            })
        }

        const response = await ProductService.deleteProduct(ProductId)
        return res.status(200).json(response);

    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
