const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type : String,
        default: "customer"
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Account"
        }
    ],
    balance: {
        type: Number, 
        default: 0
    }
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;