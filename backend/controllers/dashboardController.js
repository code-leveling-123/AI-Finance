const asyncHandler = require("express-async-handler");
const Transaction = require("../models/TransactionModel");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get total income and expenses
  const totals = await Transaction.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const income = totals.find((t) => t._id === "income")?.total || 0;
  const expense = totals.find((t) => t._id === "expense")?.total || 0;
  const balance = income - expense;

  // Get recent transactions
  const recentTransactions = await Transaction.find({ user: userId })
    .sort({ date: -1 })
    .limit(5);

  res.status(200).json({
    totals: {
      income,
      expense,
      balance,
    },
    recentTransactions,
  });
});

module.exports = {
  getDashboardStats,
};
