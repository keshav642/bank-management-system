
import { useState } from "react";
import { createAccount } from "../api";
import "./CreateAccount.css";
function CreateAccount() {
  const [formData, setFormData] = useState({
    account_number: "",
    holder_name: "",
    balance: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const accountData = {
        account_number: Number(formData.account_number),
        holder_name: formData.holder_name,
        balance: Number(formData.balance),
      };

      const response = await createAccount(accountData);

      console.log("API Response:", response.data);

      setMessage("Account created successfully!");

      setFormData({
        account_number: "",
        holder_name: "",
        balance: "",
      });
    } catch (err) {
      console.error("Create Account Error:", err);

      if (err.response) {
        setError(
          err.response.data?.detail ||
            "Failed to create account."
        );
      } else {
        setError(
          "Backend server se connection nahi ho pa raha."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-page">

      <div className="page-header">
        <div>
          <h1>Create Account</h1>
          <p>Open a new bank account</p>
        </div>
      </div>

      <div className="form-card">

        <div className="form-card-header">
          <div className="form-title-icon">
            +
          </div>

          <div>
            <h3>Account Information</h3>
            <p>
              Enter customer details to create an account
            </p>
          </div>
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-section">

            <h4>Banking Information</h4>

            <div className="form-grid">

              <div className="form-group">
                <label>
                  Account Number <span>*</span>
                </label>

                <input
                  type="number"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Account Holder Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="holder_name"
                  value={formData.holder_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

            </div>

            <div className="form-group full-width">

              <label>
                Initial Balance <span>*</span>
              </label>

              <div className="amount-input">

                <span>₹</span>

                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setFormData({
                  account_number: "",
                  holder_name: "",
                  balance: "",
                });

                setMessage("");
                setError("");
              }}
              disabled={loading}
            >
              Clear
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateAccount;
