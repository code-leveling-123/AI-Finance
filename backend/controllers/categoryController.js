const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

// @desc    Get user categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user.id });
  res.status(200).json(categories);
});

// @desc    Add a new category
// @route   POST /api/categories
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({
    user: req.user.id,
    name,
  });

  res.status(201).json(category);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await category.deleteOne();
  res.status(200).json({ id: req.params.id, message: "Category removed" });
});

module.exports = { getCategories, addCategory, deleteCategory };
