const Blog = require('../models/Blog')
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

// Get all blogs
const getBlogs = async (query, options) => {
    try {
        const page = options.page || 1;
        const limit = options.limit;
        const skip = (page - 1) * limit;

        const totalDocs = await Blog.countDocuments(query);
        const docs = await Blog.find(query)
            .sort(options.sort)
            .skip(skip)
            .limit(limit);

        return {
            docs,
            totalDocs,
            totalPages: Math.ceil(totalDocs / limit),
            page,
            hasNextPage: skip + docs.length < totalDocs,
            hasPrevPage: page > 1
        };
    } catch (error) {
        throw error;
    }
};

// Get blog by id
const getBlogById = async (idBlog) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getBlog = await Blog.findById(idBlog)
            resolve({
                status: 'OK',
                message: 'Success',
                data: getBlog
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Create blog
const createBlog = async (newBlog) => {
    return new Promise(async (resolve, reject) => {
        const { titleBlog, descBlog, image } = newBlog;
        try {
            const checkTitle = await Blog.findOne({ titleBlog });
            if (checkTitle !== null) {
                return reject({
                    status: 'Error',
                    message: 'The title of blog is already'
                });
            }
            let imageUrl = image;
            if (image) {
                try {
                    const result = await cloudinary.uploader.upload(image, { folder: 'blogs' });
                    imageUrl = result.secure_url;
                    const fs = require('fs');
                    fs.unlinkSync(image);
                } catch (err) {
                    console.error("Cloudinary or fs error:", err);
                    return reject({
                        status: 'Error',
                        message: 'Image upload failed'
                    });
                }
            }
            const createdBlog = await Blog.create({ titleBlog, descBlog, image: imageUrl });
            if (createdBlog) {
                return resolve({
                    status: 'Success',
                    message: 'Create blog is successfully',
                    data: createdBlog
                });
            }
        } catch (error) {
            console.error("Create blog error:", error);
            reject(error);
        }
    });
};

// Update blog
const updateBlog = async (idBlog, data, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBlog = await Blog.findOne({ _id: idBlog });
            if (!checkBlog) {
                return reject({ status: 'Error', message: 'Blog not found' });
            }

            let imageUrl = checkBlog.image; // mặc định giữ ảnh cũ
            // Nếu có ảnh mới (image là file path)
            if (image) {
                // Nếu ảnh cũ là local file, xóa file cũ
                if (imageUrl && !imageUrl.startsWith('http')) {
                    const fs = require('fs');
                    try { fs.unlinkSync(imageUrl); } catch (e) { reject(e) }
                }
                // Upload cloudinary
                const result = await cloudinary.uploader.upload(image, { folder: 'blogs' });
                imageUrl = result.secure_url;
                const fs = require('fs');
                fs.unlinkSync(image);
            }

            const updateData = { ...data, image: imageUrl };
            const updateBlog = await Blog.findByIdAndUpdate(idBlog, updateData, { new: true });
            if (updateBlog) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: updateBlog
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Delete blog
const deleteBlog = async (idBlog) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBlog = await Blog.findOne({
                _id: idBlog
            })

            if (!checkBlog) {
                return reject({
                    status: 'Error',
                    message: 'The idBlog is not defined'
                })
            }

            await Blog.findByIdAndDelete(idBlog)
            resolve({
                status: 'OK',
                message: `Delete Blog with ${idBlog} success`
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createBlog,
    getBlogById,
    getBlogs,
    updateBlog,
    deleteBlog,
}