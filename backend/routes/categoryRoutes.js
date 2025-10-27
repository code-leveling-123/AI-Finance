const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { validateCategory } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(protect, getCategories)
  .post(protect, validateCategory, addCategory);

router.delete("/:id", protect, deleteCategory);

module.exports = router;
