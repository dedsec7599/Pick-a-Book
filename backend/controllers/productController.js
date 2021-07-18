import asyncHandler from "express-async-handler";
//In the previous MERN stack project, we made try-catch instances for each route, Async handler solves that problem so we have used it here. It report error if their is an error in server for any route

import Product from "../models/productModel.js";

//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@desc     Fetch product by id
//@route    GET /api/products
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc     Create a product
//@route    POST /api/products
//@access   Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(product);
});

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, deleteProduct, createProduct,updateProduct };
