const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body("name", "Name is required").not().isEmpty().trim().escape(),
  body("email", "Please include a valid email").isEmail().normalizeEmail(),
  body("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
  handleValidationErrors,
];

const validateLogin = [
  body("email", "Please include a valid email").isEmail().normalizeEmail(),
  body("password", "Password is required").exists(),
  handleValidationErrors,
];

const validateTransaction = [
  body("description", "Description is required")
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body("amount", "Amount must be a number").isNumeric(),
  body("type", "Type must be either income or expense").isIn([
    "income",
    "expense",
  ]),
  body("category", "Category is required").not().isEmpty().trim().escape(),
  body("date", "Date must be a valid date").isISO8601().toDate(),
  handleValidationErrors,
];

const validateCategory = [
  body("name", "Category name is required").not().isEmpty().trim().escape(),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTransaction,
  validateCategory,
};
