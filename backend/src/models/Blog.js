const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    titleBlog: { type: String },
    descBlog: { type: String },
    image: { type: String }
},
    {
        timestamps: true
    })

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;