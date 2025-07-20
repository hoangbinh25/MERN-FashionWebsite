const BlogService = require('../services/BlogService')

// Get all blog
const getBlogs = async (req, res) => {
    try {
        const {
            page = 1,
            limit,
            sort = 'title',
            order = 'asc',
            search = ''
        } = req.query;

        const query = search
            ? { titleBlog: { $regex: search, $options: 'i' } }
            : {};

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sort]: order === 'desc' ? -1 : 1 }
        };

        const blogs = await BlogService.getBlogs(query, options);

        res.json({
            status: 'OK',
            message: 'Success',
            data: blogs.docs,
            pagination: {
                totalItems: blogs.totalDocs,
                totalPages: blogs.totalPages,
                currentPage: blogs.page,
                hasNextPage: blogs.hasNextPage,
                hasPrevPage: blogs.hasPrevPage
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Get blogs failure',
            error: error.message
        });
    }
};

// [GET] 
const getBlogById = async (req, res) => {
    try {
        const idBlog = req.params.id;
        const blog = await BlogService.getBlogById(idBlog);
        res.json(blog);
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id blog not found',
            error: error.message
        })
    }
}

// Create blog
const createBlog = async (req, res) => {
    try {
        const image = req.file ? req.file.path : null;
        const { titleBlog, descBlog } = req.body;

        if (!titleBlog || !descBlog || !image) {
            return res.status(400).json({
                status: 'Error',
                message: 'The input is required',
            })
        }
        const newBlog = await BlogService.createBlog({ titleBlog, descBlog, image });
        if (newBlog) return res.status(200).json({
            status: 'Success',
            message: 'Create blog successfully',
            newBlog
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Error', message: 'Error server'
        })
    }
}

// Update blog
const updateBlog = async (req, res) => {
    try {
        const idBlog = req.params.id
        const data = req.body
        const image = req.file ? req.file.path : null;

        if (!idBlog) {
            return res.status(400).json({
                status: 'Error',
                message: 'Id Blog not found',
                error: error.message

            })
        }
        const updateBlog = await BlogService.updateBlog(idBlog, data, image)
        res.json(updateBlog)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Blog not found',
            error: error.message

        })
    }
}

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        const idBlog = req.params.id
        if (!idBlog) {
            return res.status(400).json({
                status: 'Error',
                message: 'Id Blog not found',
                error: error.message
            })
        }
        const deleteBlog = await BlogService.deleteBlog(idBlog)
        res.json(deleteBlog)
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: 'Id Blog not found',
            error: error.message
        })
    }
}


module.exports = {
    createBlog,
    getBlogById,
    getBlogs,
    updateBlog,
    deleteBlog,
}