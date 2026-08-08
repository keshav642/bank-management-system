
import { useState } from "react";
import { depositMoney } from "../api";
import "./Deposit.css";
function Deposit() {
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

      // FastAPI backend call
      const response = await depositMoney(
        Number(accountNumber),
        Number(amount)
      );

      console.log("Deposit Response:", response.data);

      alert("Amount deposited successfully!");

      // Clear form
      setAccountNumber("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Deposit API Error:", error);

      if (error.response) {
        alert(
          error.response.data?.detail ||
            "Deposit failed"
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
          <h1>Deposit Money</h1>
          <p>Add money to a customer bank account</p>
        </div>
      </div>

      <div className="transaction-layout">

        {/* Deposit Form */}
        <div className="form-card">

          <div className="form-card-header">

            <div className="transaction-title-icon deposit-title">
              ↓
            </div>

            <div>
              <h3>Deposit Details</h3>
              <p>
                Enter the account and deposit amount
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

              {/* Amount */}
              <div className="form-group transaction-amount-group">

                <label>
                  Deposit Amount <span>*</span>
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
                className="primary-btn deposit-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "↓ Deposit Money"}
              </button>

            </div>

          </form>

        </div>

        {/* Summary */}
        <div className="transaction-summary">

          <div className="summary-card">

            <div className="summary-header">

              <h3>Transaction Summary</h3>

              <span className="summary-icon">
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

              <strong className="deposit-text">
                Deposit
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

              <span>Total Deposit</span>

              <strong>
                ₹
                {amount
                  ? Number(amount).toLocaleString("en-IN")
                  : "0"}
              </strong>

            </div>

          </div>

          <div className="info-card">

            <div className="info-icon">
              ✓
            </div>

            <div>

              <strong>
                Secure Transaction
              </strong>

              <p>
                All transactions will be recorded
                securely in the banking system.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Deposit;
