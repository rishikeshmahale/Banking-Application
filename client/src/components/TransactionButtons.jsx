import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const TransactionButtons = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [amount, setAmount] = useState("");

  const openDeposit = () => {
    setPopupType("Deposit");
    setOpenPopup(true);
  };

  const openWithdraw = () => {
    setPopupType("Withdraw");
    setOpenPopup(true);
  };

  const closePopup = () => {
    setOpenPopup(false);
    setAmount("");
  };

  const handleConfirm = async () => {
    console.log("Action:", popupType);
    console.log("Amount:", amount);

    if (!amount || amount <= 0) {
      alert("Enter a valid number");
      toast("Enter a valid number");
      return;
    }

    let url =
      popupType === "Deposit"
        ? import.meta.env.VITE_API_URL + "/deposit"
        : popupType === "Withdraw"
        ? import.meta.env.VITE_API_URL + "/withdraw"
        : null;

    try {
      const response = await axios.post(
        url,
        {
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success(response.data.message);
      // alert(response.data.message);
      console.log("Updated Balance:", response.data.balance);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    closePopup();
  };

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={openDeposit}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Deposit
        </button>

        <button
          onClick={openWithdraw}
          className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Withdraw
        </button>
      </div>

      {/* Popup */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">{popupType} Amount</h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            />

            <button
              onClick={handleConfirm}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Confirm {popupType}
            </button>

            <button
              onClick={closePopup}
              className="w-full mt-2 py-2 bg-gray-300 rounded hover:bg-gray-400 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionButtons;
