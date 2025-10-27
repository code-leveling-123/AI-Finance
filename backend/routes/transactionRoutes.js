const express = require("express");
const router = express.Router();
const {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");
const { validateTransaction } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, validateTransaction, setTransaction);
router
  .route("/:id")
  .put(protect, validateTransaction, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
