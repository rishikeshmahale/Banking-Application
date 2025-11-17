const express = require("express");
const router = express.Router();

// middleware
const { verifyToken } = require("../middlewares/verifyToken.js");

// constrollers
const { depositMoney, withdrawMoney, getSingleCustomerTransactions, getAllCustomers, getCustomerTransactionsById } = require("../controllers/transactionController.js");


// deposit route
router.post("/deposit", verifyToken, depositMoney);
// withdraw route
router.post("/withdraw", verifyToken, withdrawMoney);

// all transactions of single customers 
router.get("/customer-transactions", verifyToken, getSingleCustomerTransactions);


// banker router

// get all the customers
router.get("/banker/all-customers", verifyToken, getAllCustomers);

// get single customer by its id
router.get("/banker/customer/:id", verifyToken, getCustomerTransactionsById);


module.exports = router;