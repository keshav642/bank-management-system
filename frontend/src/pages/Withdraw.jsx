import { useState } from "react";
import { withdrawMoney } from "../api";
import "./Withdraw.css";

function Withdraw() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountNumber || !amount) {
      alert("Please fill all required fields");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const response = await withdrawMoney(
        Number(accountNumber),
        Number(amount)
      );

      console.log("Withdraw Response:", response.data);

      alert("Amount withdrawn successfully!");

      setAccountNumber("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Withdraw API Error:", error);

      if (error.response) {
        alert(
          error.response.data?.detail ||
            "Withdrawal failed"
        );
      } else {
        alert(
          "Backend server se connection nahi ho raha."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setAccountNumber("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="transaction-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Withdraw Money</h1>
          <p>
            Withdraw money from a customer bank account
          </p>
        </div>
      </div>

      <div className="transaction-layout">

        {/* Withdraw Form */}
        <div className="form-card">

          <div className="form-card-header">

            <div className="transaction-title-icon withdraw-title">
              ↑
            </div>

            <div>
              <h3>Withdrawal Details</h3>
              <p>
                Enter the account and withdrawal amount
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-section">

              {/* Account Number */}
              <div className="form-group">

                <label>
                  Account Number <span>*</span>
                </label>

                <input
                  type="number"
                  value={accountNumber}
                  onChange={(e) =>
                    setAccountNumber(e.target.value)
                  }
                  placeholder="Enter account number"
                  required
                />

              </div>

              {/* Withdrawal Amount */}
              <div className="form-group transaction-amount-group">

                <label>
                  Withdrawal Amount <span>*</span>
                </label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="0"
                    min="1"
                    step="0.01"
                    required
                  />

                </div>

              </div>

              {/* Description */}
              <div className="form-group full-width">

                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Enter transaction description (optional)"
                  rows="4"
                />

              </div>

            </div>

            {/* Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={clearForm}
                disabled={loading}
              >
                Clear
              </button>

              <button
                type="submit"
                className="primary-btn withdraw-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "↑ Withdraw Money"}
              </button>

            </div>

          </form>

        </div>

        {/* Summary */}
        <div className="transaction-summary">

          <div className="summary-card">

            <div className="summary-header">

              <h3>Transaction Summary</h3>

              <span className="summary-icon withdraw-summary-icon">
                ₹
              </span>

            </div>

            <div className="summary-item">

              <span>Account Number</span>

              <strong>
                {accountNumber || "—"}
              </strong>

            </div>

            <div className="summary-item">

              <span>Transaction Type</span>

              <strong className="withdraw-text">
                Withdrawal
              </strong>

            </div>

            <div className="summary-item">

              <span>Amount</span>

              <strong className="summary-amount">
                ₹
                {amount
                  ? Number(amount).toLocaleString("en-IN")
                  : "0"}
              </strong>

            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">

              <span>Total Withdrawal</span>

              <strong className="withdraw-total">
                ₹
                {amount
                  ? Number(amount).toLocaleString("en-IN")
                  : "0"}
              </strong>

            </div>

          </div>

          {/* Warning */}
          <div className="warning-card">

            <div className="warning-icon">
              !
            </div>

            <div>

              <strong>Important</strong>

              <p>
                Make sure the account has sufficient
                balance before processing the withdrawal.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Withdraw;