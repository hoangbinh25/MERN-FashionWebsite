const Category = require('../models/Category')

// Get all categories
const getCategories = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAll = await Category.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: getAll
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Get category by id
const getCategoryById = async (idCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getCategory = await Category.findById(idCategory)
            resolve({
                status: 'OK',
                message: 'Success',
                data: getCategory
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Create category
const createCategory = async (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { nameCategory } = newCategory
        try {
            const checkCategory = await Category.findOne({
                nameCategory: nameCategory
            })

            if (checkCategory !== null) {
                return reject({
                    status: 'Error',
                    message: 'The name of category is already'
                })
            }

            const createdCategory = await Category.create({ nameCategory })
            if (createdCategory) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: createdCategory
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Update category
const updateCategory = async (idCategory, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: idCategory
            });

            const updateCategory = await Category.findByIdAndUpdate(idCategory, data, { new: true })
            if (updateCategory) {
                resolve({
                    status: "OK",
                    message: "Succress",
                    data: updateCategory
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

// Delete category
const deleteCategory = async (idCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: idCategory
            })

            if (!checkCategory) {
                return reject({
                    status: 'Error',
                    message: 'The idCategory is not defined'
                })
            }

            await Category.findByIdAndDelete(idCategory)
            resolve({
                status: 'OK',
                message: `Delete category with ${idCategory} success`
            })

        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
