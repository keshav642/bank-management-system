import { useState } from "react";
import { transferMoney } from "../api";
import "./Transfer.css";

function Transfer() {
  const [senderAccount, setSenderAccount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!senderAccount || !receiverAccount || !amount) {
      alert("Please fill all required fields");
      return;
    }

    if (senderAccount === receiverAccount) {
      alert("Sender and receiver accounts cannot be the same");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const transferData = {
        sender_account: Number(senderAccount),
        receiver_account: Number(receiverAccount),
        amount: Number(amount),
      };

      const response = await transferMoney(transferData);

      alert(
        response.data?.message || "Money transferred successfully!"
      );

      setSenderAccount("");
      setReceiverAccount("");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Transfer API Error:", error);

      const message =
        error.response?.data?.detail ||
        "Transfer failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Transfer Money</h1>
          <p>Transfer money between bank accounts</p>
        </div>
      </div>

      <div className="transfer-layout">

        {/* Transfer Form */}
        <div className="form-card">

          <div className="form-card-header">
            <div className="transaction-title-icon transfer-title">
              ⇄
            </div>

            <div>
              <h3>Transfer Details</h3>
              <p>
                Enter sender and receiver account details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-section">

              {/* Sender */}
              <div className="form-group">
                <label>
                  Sender Account <span>*</span>
                </label>

                <input
                  type="number"
                  value={senderAccount}
                  onChange={(e) =>
                    setSenderAccount(e.target.value)
                  }
                  placeholder="Enter sender account number"
                  required
                />
              </div>

              {/* Arrow */}
              <div className="transfer-arrow">
                ↓
              </div>

              {/* Receiver */}
              <div className="form-group">
                <label>
                  Receiver Account <span>*</span>
                </label>

                <input
                  type="number"
                  value={receiverAccount}
                  onChange={(e) =>
                    setReceiverAccount(e.target.value)
                  }
                  placeholder="Enter receiver account number"
                  required
                />
              </div>

              {/* Amount */}
              <div className="form-group transaction-amount-group">
                <label>
                  Transfer Amount <span>*</span>
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
                onClick={() => {
                  setSenderAccount("");
                  setReceiverAccount("");
                  setAmount("");
                  setDescription("");
                }}
                disabled={loading}
              >
                Clear
              </button>

              <button
                type="submit"
                className="primary-btn transfer-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "⇄ Transfer Money"}
              </button>

            </div>

          </form>
        </div>

        {/* Summary */}
        <div className="transaction-summary">

          <div className="summary-card">

            <div className="summary-header">
              <h3>Transfer Summary</h3>

              <span className="summary-icon transfer-summary-icon">
                ⇄
              </span>
            </div>

            <div className="summary-item">
              <span>From Account</span>

              <strong>
                {senderAccount || "—"}
              </strong>
            </div>

            <div className="summary-item">
              <span>To Account</span>

              <strong>
                {receiverAccount || "—"}
              </strong>
            </div>

            <div className="summary-item">
              <span>Transaction Type</span>

              <strong className="transfer-text">
                Transfer
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
              <span>Total Transfer</span>

              <strong className="transfer-total">
                ₹
                {amount
                  ? Number(amount).toLocaleString("en-IN")
                  : "0"}
              </strong>
            </div>

          </div>

          {/* Security Information */}
          <div className="info-card transfer-info">

            <div className="info-icon">
              ✓
            </div>

            <div>
              <strong>Secure Transfer</strong>

              <p>
                Verify the sender and receiver account
                numbers before completing the transaction.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Transfer;