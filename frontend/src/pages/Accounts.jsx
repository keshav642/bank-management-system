import { useEffect, useState } from "react";
import { getAccounts, deleteAccount } from "../api";
import "./Accounts.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);

  // ================================
  // Load Accounts
  // ================================

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAccounts();

      const data = response.data?.data;

      if (Array.isArray(data)) {
        setAccounts(data);
      } else {
        setAccounts([]);
      }
    } catch (err) {
      console.error("Accounts API Error:", err);

      setError(
        "Unable to load accounts. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // ================================
  // Delete Account
  // ================================

  const handleDelete = async (accountNumber) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete account #${accountNumber}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(accountNumber);
      setError("");

      await deleteAccount(accountNumber);

      setAccounts((previousAccounts) =>
        previousAccounts.filter(
          (account) =>
            account.account_number !== accountNumber
        )
      );

      if (
        selectedAccount?.account_number === accountNumber
      ) {
        setSelectedAccount(null);
      }

      alert("Account deleted successfully!");
    } catch (err) {
      console.error("Delete Account Error:", err);

      const message =
        err.response?.data?.detail ||
        "Unable to delete account.";

      setError(message);
    } finally {
      setDeleting(null);
    }
  };

  // ================================
  // Search
  // ================================

  const filteredAccounts = accounts.filter((account) => {
    const holderName =
      account.holder_name?.toLowerCase() || "";

    const accountNumber = String(
      account.account_number || ""
    );

    const searchValue = search.toLowerCase();

    return (
      holderName.includes(searchValue) ||
      accountNumber.includes(searchValue)
    );
  });

  // ================================
  // UI
  // ================================

  return (
    <div className="accounts-page">

      {/* Header */}

      <div className="page-header">
        <div>
          <h1>Accounts</h1>
          <p>Manage all bank accounts</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            window.location.href = "/create-account";
          }}
        >
          + Create Account
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="accounts-error">
          <span>!</span>
          {error}
        </div>
      )}

      {/* Search */}

      <div className="search-section">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by name or account number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <span className="account-count">
          {loading
            ? "Loading..."
            : `${filteredAccounts.length} Accounts`}
        </span>

      </div>

      {/* Accounts Card */}

      <div className="accounts-card">

        <div className="table-header">

          <div>
            <h3>All Accounts</h3>
            <p>Real accounts from PostgreSQL</p>
          </div>

          <button
            className="view-btn"
            onClick={loadAccounts}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="accounts-loading">
            <div className="loading-spinner"></div>
            <p>Loading accounts...</p>
          </div>

        ) : filteredAccounts.length === 0 ? (

          /* Empty */

          <div className="no-accounts">

            <div className="empty-icon">
              ₹
            </div>

            <h3>No accounts found</h3>

            <p>
              {search
                ? "Try searching with another name or account number."
                : "There are currently no accounts in the database."}
            </p>

          </div>

        ) : (

          /* Table */

          <div className="table-wrapper">

            <table className="accounts-table">

              <thead>
                <tr>
                  <th>ACCOUNT</th>
                  <th>ACCOUNT HOLDER</th>
                  <th>BALANCE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredAccounts.map((account) => (

                  <tr
                    key={account.account_number}
                  >

                    {/* Account */}

                    <td>
                      <div className="account-number">

                        <div className="account-icon">
                          ₹
                        </div>

                        <div>
                          <strong>
                            #{account.account_number}
                          </strong>

                          <span>
                            Bank Account
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Holder */}

                    <td>
                      <div className="holder-info">
                        <strong>
                          {account.holder_name}
                        </strong>

                        <span>
                          Customer
                        </span>
                      </div>
                    </td>

                    {/* Balance */}

                    <td>
                      <strong className="balance">
                        ₹
                        {Number(
                          account.balance || 0
                        ).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                    </td>

                    {/* Status */}

                    <td>
                      <span className="account-status">
                        Active
                      </span>
                    </td>

                    {/* Actions */}

                    <td>

                      <div className="account-actions">

                        <button
                          className="action-btn"
                          onClick={() =>
                            setSelectedAccount(account)
                          }
                        >
                          View
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              account.account_number
                            )
                          }
                          disabled={
                            deleting ===
                            account.account_number
                          }
                        >
                          {deleting ===
                          account.account_number
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ================================
          Account Details Modal
      ================================= */}

      {selectedAccount && (

        <div
          className="account-modal-overlay"
          onClick={() =>
            setSelectedAccount(null)
          }
        >

          <div
            className="account-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>Account Details</h2>
                <p>
                  Bank account information
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedAccount(null)
                }
              >
                ×
              </button>

            </div>

            <div className="modal-account-icon">
              ₹
            </div>

            <div className="modal-details">

              <div className="detail-item">
                <span>Account Number</span>

                <strong>
                  #{selectedAccount.account_number}
                </strong>
              </div>

              <div className="detail-item">
                <span>Account Holder</span>

                <strong>
                  {selectedAccount.holder_name}
                </strong>
              </div>

              <div className="detail-item">
                <span>Available Balance</span>

                <strong className="modal-balance">
                  ₹
                  {Number(
                    selectedAccount.balance || 0
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <span className="account-status">
                  Active
                </span>
              </div>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedAccount(null)
                }
              >
                Close
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    selectedAccount.account_number
                  )
                }
                disabled={
                  deleting ===
                  selectedAccount.account_number
                }
              >
                {deleting ===
                selectedAccount.account_number
                  ? "Deleting..."
                  : "Delete Account"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Accounts;