const CategoryService = require('../services/CategoryService');

// [GET] category/getCategories
const getCategories = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 5,
            sort = 'nameCategory',
            order = 'asc',
            search = ''
        } = req.query;

        const query = search
            ? { nameCategory: { $regex: search, $options: 'i' } }
            : {};

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sort]: order === 'desc' ? -1 : 1 }
        };

        const categories = await CategoryService.getCategories(query, options);

        res.json({
            status: 'OK',
            message: 'Success',
            data: categories.docs,
            pagination: {
                totalItems: categories.totalDocs,
                totalPages: categories.totalPages,
                currentPage: categories.page,
                hasNextPage: categories.hasNextPage,
                hasPrevPage: categories.hasPrevPage
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Get Categories failure',
            error: error.message
        });
    }
};

// [GET] category/getCategory/:id
const getCategoryById = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const category = await CategoryService.getCategoryById(idCategory);
        res.json(category);
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found',
            error: error.message
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
                message: 'The name category is required',
                error: error.message
            })
        }

        const newCategory = await CategoryService.createCategory(req.body)
        if (newCategory) {
            return res.status(200).json({ newCategory })
        }
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Create category failure',
            error: error.message
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
                message: 'Id Category not found',
                error: error.message

            })
        }
        const updateCategory = await CategoryService.updateCategory(idCategory, data)
        res.json(updateCategory)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found',
            error: error.message

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
                message: 'Id Category not found',
                error: error.message
            })
        }
        const deleteCategory = await CategoryService.deleteCategory(idCategory)
        res.json(deleteCategory)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Category not found',
            error: error.message
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

