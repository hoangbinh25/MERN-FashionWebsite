const Product = require('../models/Product');
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");
const { ObjectId } = require('mongodb');

// Update isActive status for product
const updateProductIsActive = async (productId, isActive) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { isActive },
        { new: true }
      ).populate('category', 'nameCategory');
      if (!updatedProduct) {
        return reject({
          status: 'Error',
          message: 'Product not found',
        });
      }
      resolve({
        status: 'OK',
        message: 'isActive updated',
        data: updatedProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Get all product
const getProducts = async (limit, page, sort, nameProduct, category, size, minPrice, maxPrice) => {
  return new Promise(async (resolve, reject) => {
    try {
      let objectFilter = {};
      if (nameProduct) {
        objectFilter.nameProduct = { $regex: nameProduct, $options: 'i' }
      }

      if (category && category !== "All Products") {
        objectFilter.category = category;
      }

      if (size && size !== "All") {
        objectFilter['variations'] = { $elemMatch: { size: size } };
      }
      if (minPrice || maxPrice) {
        objectFilter.price = {};
        if (minPrice) objectFilter.price.$gte = Number(minPrice);
        if (maxPrice) objectFilter.price.$lte = Number(maxPrice);
      }

      // Nếu sort là category, dùng aggregation để sort theo category.nameCategory
      let getAllProduct, totalProduct;
      if (sort && sort.startsWith('category')) {
        const sortOrder = sort.endsWith('desc') ? -1 : 1;
        const pipeline = [
          { $match: objectFilter },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'categoryInfo'
            }
          },
          { $unwind: '$categoryInfo' },
          { $sort: { 'categoryInfo.nameCategory': sortOrder } },
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ];
        getAllProduct = await Product.aggregate(pipeline);
        totalProduct = await Product.countDocuments(objectFilter);
        // Gắn lại category cho giống populate
        getAllProduct = getAllProduct.map(p => ({
          ...p,
          category: { _id: p.categoryInfo._id, nameCategory: p.categoryInfo.nameCategory }
        }));
      } else {
        totalProduct = await Product.countDocuments(objectFilter);
        let objectSort = { createdAt: -1 };
        if (sort) {
          const [sortField, sortOrder] = sort.split('-');
          objectSort = { [sortField]: sortOrder === 'desc' ? -1 : 1 };
        } else {
          objectSort = { createdAt: -1 }
        }
        getAllProduct = await Product.find(objectFilter)
          .limit(limit)
          .skip((page - 1) * limit)
          .populate('category', 'nameCategory')
          .sort(objectSort);
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: getAllProduct,
        totalProduct,
        pageCurrent: Number(page),
        totalPage: Math.ceil(totalProduct / limit)
      });
    } catch (error) {
      reject(error);
    }
  });
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
const createProduct = async (newProduct, files) => {
  return new Promise(async (resolve, reject) => {
    const {
      nameProduct,
      description,
      category,
      price,
      variations,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({ nameProduct });
      if (checkProduct) {
        return res.status(400).json({
          status: "Error",
          message: "Tên sản phẩm đã tồn tại",
        });
      }

      // Upload từng ảnh
      const imageUrls = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // Xóa file tạm sau khi upload
      }

      let parsedVariations = [];
      try {
        parsedVariations = typeof variations === "string" ? JSON.parse(variations) : variations; // sẽ là array [{ size, quantity }]
      } catch (err) {
        return reject({ status: 'Error', message: 'Định dạng không hợp lệ' });
      }

      // Tạo sản phẩm
      const createdProduct = await Product.create({
        nameProduct,
        description,
        image: imageUrls,
        category,
        price,
        variations: parsedVariations,
      });

      resolve({
        status: "OK",
        message: "Thêm sản phẩm mới thành công",
        data: createdProduct,
      });
    } catch (error) {
      console.log('CreateProduct error:', error);
      reject(error);
    }
  });
};

const updateProduct = async (productId, data, files) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({
          status: "Error",
          message: "Không tìm thấy sản phẩm",
        });
      }

      // Mảng ảnh cũ còn giữ lại (từ client gửi về)
      const imageOld = data.imageOld ? JSON.parse(data.imageOld) : [];
      console.log("imageOld:", imageOld);
      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (!files || files.length === 0) {
        data.image = imageOld;
      }

      if (typeof data.variations === "string") {
        try {
          data.variations = JSON.parse(data.variations);
        } catch (err) {
          return reject({ status: 'Error', message: 'Không đúng định dạng' });
        }
      }

      // Xóa ảnh không còn giữ
      const imagesToDelete = product.image.filter((img) => !imageOld.includes(img));
      for (const url of imagesToDelete) {
        // Lấy public_id từ URL
        const segments = url.split("/");
        const filename = segments[segments.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${filename}`);
      }

      // Upload ảnh mới (nếu có)
      const newImageUrls = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        newImageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // xóa file tạm
      }

      // Gộp ảnh giữ lại + mới upload
      const updatedImages = [...imageOld, ...newImageUrls];

      // Cập nhật sản phẩm
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          ...data,
          image: updatedImages,
          variations: data.variations,
        },
        { new: true }
      ).populate("category", "nameCategory");

      resolve({
        status: "OK",
        message: "Success",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("Lỗi update product:", error);
      reject(error);
    }
  });
};

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
          message: 'Sản phẩm không tồn tại'
        })
      }

      await Product.findByIdAndDelete(productId)
      resolve({
        status: 'OK',
        message: `Xóa sản phẩm với ${productId} thành công`
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
  updateProductIsActive,
};
