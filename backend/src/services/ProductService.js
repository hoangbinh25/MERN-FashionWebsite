const Product = require('../models/Product');

// Get all product
const getProducts = async (limit, page, sort, nameProduct, category, color, size, minPrice, maxPrice) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {};
            if (nameProduct) {
                objectFilter.nameProduct = { $regex: nameProduct, $options: 'i' }
            }

            if (category) {
                objectFilter.category = category;
            }

            if (color) {
                objectFilter.color = color;
            }

            if (size) {
                objectFilter.size = size;
            }

            if (minPrice || maxPrice) {
                objectFilter.price = {};
                if (minPrice) objectFilter.price.$gte = Number(minPrice);
                if (maxPrice) objectFilter.price.$lte = Number(maxPrice);
            }

            const totalProduct = await Product.countDocuments(objectFilter)
            let objectSort = { nameProduct: 1 };
            if (sort) {
                const [sortField, sortOrder] = sort.split('-')
                objectSort = { [sortField]: sortOrder === 'desc' ? -1 : 1 } 
            }
            const getAllProduct = await Product.find(objectFilter)
                .limit(limit)
                .skip((page - 1) * limit)
                .populate('category', 'nameCategory')
                .sort(objectSort)
            resolve({
                status: 'OK',
                message: 'Success',
                data: getAllProduct,
                totalProduct,
                pageCurrent: Number(page),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Get product by id
const getProductById = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getproduct = await Product.findById(productId).populate('category', 'nameCategory')
            resolve({
                status: 'OK',
                message: 'Success',
                data: getproduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Create product
const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { nameProduct, description, image, category, quantity, price, size, color } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                nameProduct: nameProduct
            })

            if (checkProduct !== null) {
                return reject({
                    status: 'Error',
                    message: 'The product name already exists'
                })
            }

            // Create new product
            const createdProduct = await Product.create({
                nameProduct,
                description,
                image,
                category,
                quantity,
                price,
                size,
                color
            })

            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "Product created successfully",
                    data: createdProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Update product
const updateProduct = async (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: productId
            });

            const updateProduct = await Product.findByIdAndUpdate(productId, data, { new: true }).populate('category', 'nameCategory')
            if (updateProduct) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: updateProduct
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

// Delete product
const deleteProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: productId
            })

            if (!checkProduct) {
                return reject({
                    status: 'Error',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(productId)
            resolve({
                status: 'OK',
                message: `Delete product with ${productId} success`
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
