const validateProduct = (req, res, next) => {
    const { nameProduct, description, image, category, quantity, price, size, color } = req.body;

    // Basic validation
    if (!nameProduct || !description || !price || !category) {
        return res.status(400).json({
            status: 'Error',
            message: 'Missing required fields: nameProduct, description, price, category'
        });
    }

    // Type validation
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            status: 'Error',
            message: 'Price must be a positive number'
        });
    }

    if (quantity && (typeof quantity !== 'number' || quantity < 0)) {
        return res.status(400).json({
            status: 'Error',
            message: 'Quantity must be a non-negative number'
        });
    }

    next();
};

const validateCategory = (req, res, next) => {
    const { nameCategory } = req.body;

    if (!nameCategory || nameCategory.trim() === '') {
        return res.status(400).json({
            status: 'Error',
            message: 'Category name is required'
        });
    }

    next();
};

module.exports = {
    validateProduct,
    validateCategory
}; 