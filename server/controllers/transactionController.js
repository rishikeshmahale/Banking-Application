const User = require("../models/User.js");
const Account = require("../models/Account.js");

// deposit amount controller
const depositMoney = async (req, res) => {
  try {
    const userId = req.id;
    const accountType = req.accountType;
    const amount = Number(req.body.amount);

    // only the customers can deposit money
    if (accountType !== "customer") {
      return res
        .status(403)
        .json({ success: false, message: "Only customers can deposit money" });
    }

    // checking if the amount is greater than zero or a validated amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be more than 0" });
    }

    // finding user by its id
    const user = await User.findById(userId);

    // checking if the same user exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const transaction = await Account.create({
      type: "deposit",
      amount: amount,
      user: userId,
    });

    // updating the user balance by adding the new amount with the previous balance
    user.balance += amount;

    // pushing the transaction id into the transactions array of user
    user.transactions.push(transaction._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Deposit successful",
      balance: user.balance,
      transaction: transaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// withdraw amount controller
const withdrawMoney = async (req, res) => {
  try {
    const userId = req.id;
    const accountType = req.accountType;
    const amount = Number(req.body.amount);

    // only customers are allowed to do withdraw
    if (accountType !== "customer") {
      return res
        .status(403)
        .json({ success: false, message: "Only customers can withdraw money" });
    }

    // the given amount must be greater than zero or it must be an amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be more than 0" });
    }

    // find user by its own id
    const user = await User.findById(userId);

    // check is user's balance is more than zero or is it more than the amount user want s to withdraw
    if (user.balance <= 0 || user.balance < amount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient funds" });
    }

    // create transaction
    const transaction = await Account.create({
      type: "withdraw",
      amount: amount,
      user: userId,
    });

    // deduct the amount the user has withdrawn with his/her's existing balance
    user.balance -= amount;

    // pushing the transacton id of the created transaction into to user's transactions array
    user.transactions.push(transaction._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully withdrawn money",
      balance: user.balance,
      transaction: transaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// conroller to fetch single customer transactions
const getSingleCustomerTransactions = async (req, res) => {
  try {
    const userId = req.id;
    const accountType = req.accountType;

    // only authenticated customers are allowed to view their transactions
    if (accountType !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only Customers can view their transactions",
      });
    }

    // find user by its own unique id and populate all the transactions it has done and sorting base on the lastest transactions
    const user = await User.findById(userId).populate({
      path: "transactions",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No User found." });
    }

    if (user.transactions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No transaction found" });
    }

    return res.status(200).json({
      success: true,
      message: "Your Transactions",
      transactions: user.transactions,
      balance: user.balance,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Controllers for admin access

const getAllCustomers = async (req, res) => {
  const accountType = req.accountType;

  try {
    // only bankers can view all customers
    if (accountType !== "banker") {
      return res.status(403).json({
        success: false,
        message: "Only bankers can view the customers",
      });
    }

    // find all customers account
    const customers = await User.find({ accountType: "customer" })
      .select("-password")
      .sort({ createdAt: -1 });

    // since its an array , will check whether is there any customer
    if (customers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No customer found" });
    }

    return res.status(200).json({
      success: true,
      customers: customers,
      totalCustomers: customers.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerTransactionsById = async (req, res) => {
  const accountType = req.accountType;
  const customerId = req.params.id;

  try {

    // user has to be banker to access customer's transactions
    if (accountType !== "banker") {
      return res.status(403).json({
        success: false,
        message: "Only banker has access to view customer transactions",
      });
    }

    // find user and populate its transcations
    const user = await User.findById(customerId)
      .select("-password")
      .populate({
        path: "transactions",
        sort: {
          createdAt: -1,
        },
      });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // fethed user has to be customer
    if (user.accountType !== "customer") {
      return res.status(400).json({
        success: false,
        message: "This user is not a customr",
      });
    }

    // checking if the fetched customer has transactions
    if (user.transactions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Customer has no transactions" });
    }

    return res.status(200).json({
      sucess: true,
      customer: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
      },
      transactions: user.transactions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  depositMoney,
  withdrawMoney,
  getSingleCustomerTransactions,
  getAllCustomers,
  getCustomerTransactionsById
};
