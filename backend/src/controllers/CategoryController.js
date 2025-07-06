const CategoryService = require('../services/CategoryService');

// [GET] category/getCategories
const getCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getCategories();
        res.json(categories)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Get All Category failure'
        })
    }
}

// [GET] category/getCategory/:id
const getCategoryById = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const category = await CategoryService.getCategoryById(idCategory);
        res.json(category);
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found'
        })
    }
}

// [POST] category/create
const createCategory = async (req, res) => {
    try {
        const { nameCategory } = req.body
        if (!nameCategory) {
            return res.status(400).json({
                status: 'Error',
                message: 'The name category is required'
            })
        }

        const newCategory = await CategoryService.createCategory(req.body)
        if (newCategory) {
            return res.status(200).json({ newCategory })
        }
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Create category failure'
        })
    }

}
// [PUT] category/update/:id
const updateCategory = async (req, res) => {
    try {
        const idCategory = req.params.id
        const data = req.body

        if (!idCategory) {
            return res.status(400).json({
                status: 'Error',
                message: 'Id Category not found'
            })
        }
        const updateCategory = await CategoryService.updateCategory(idCategory, data)
        res.json(updateCategory)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found'
        })
    }
}

// [DELETE] category/delete/:id
const deleteCategory = async (req, res) => {
    try {
        const idCategory = req.params.id
        if (!idCategory) {
            return res.status(400).json({
                status: 'Error',
                message: 'Id Category not found'
            })
        }
        const deleteCategory = await CategoryService.deleteCategory(idCategory)
        res.json(deleteCategory)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found'
        })
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}

