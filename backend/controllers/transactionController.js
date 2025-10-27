const asyncHandler = require("express-async-handler");
const Transaction = require("../models/TransactionModel");

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });
  res.status(200).json(transactions);
});

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  const { description, amount, type, category, date } = req.body;

  const transaction = await Transaction.create({
    user: req.user.id,
    description,
    amount,
    type,
    category,
    date,
  });

  res.status(201).json(transaction);
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTransaction);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await transaction.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
};
