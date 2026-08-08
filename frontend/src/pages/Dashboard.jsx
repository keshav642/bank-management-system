import { useEffect, useState } from "react";
import { getAccounts } from "../api";
import AccountCard from "../components/AccountCard";
import "./Dashboard.css";

function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // Load Accounts From FastAPI
  // ================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAccounts();

      /*
        FastAPI response:

        {
          "data": [
            {
              "account_number": 101,
              "holder_name": "Keshav",
              "balance": 10000
            }
          ]
        }
      */

      const accountsData = response.data?.data;

      if (Array.isArray(accountsData)) {
        setAccounts(accountsData);
      } else {
        setAccounts([]);
      }

    } catch (err) {
      console.error("Dashboard API Error:", err);

      setAccounts([]);
      setError(
        "Unable to load account data. Please check your backend."
      );

    } finally {
      setLoading(false);
    }
  };

  // ================================
  // Load On Page Open
  // ================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // ================================
  // Calculations
  // ================================

  const totalAccounts = accounts.length;

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + Number(account.balance || 0),
    0
  );

  /*
    Backend currently does not send status/is_active.

    So every account returned by the backend
    is treated as active.
  */
  const activeAccounts = accounts.length;

  const averageBalance =
    totalAccounts > 0
      ? totalBalance / totalAccounts
      : 0;

  // ================================
  // UI
  // ================================

  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Overview of your bank management system
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={loadDashboard}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>

      </div>


      {/* Error */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      {/* Statistics */}

      <div className="stats-grid">

        {/* Total Accounts */}

        <div className="stat-card">

          <div className="stat-icon blue">
            #
          </div>

          <div>

            <p>Total Accounts</p>

            <h2>
              {loading ? "..." : totalAccounts}
            </h2>

            <span className="positive">
              Live database data
            </span>

          </div>

        </div>


        {/* Total Balance */}

        <div className="stat-card">

          <div className="stat-icon green">
            ₹
          </div>

          <div>

            <p>Total Balance</p>

            <h2>
              {loading
                ? "..."
                : `₹${totalBalance.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
            </h2>

            <span className="positive">
              PostgreSQL balance
            </span>

          </div>

        </div>


        {/* Active Accounts */}

        <div className="stat-card">

          <div className="stat-icon orange">
            ✓
          </div>

          <div>

            <p>Active Accounts</p>

            <h2>
              {loading ? "..." : activeAccounts}
            </h2>

            <span className="positive">
              Currently active
            </span>

          </div>

        </div>


        {/* Average Balance */}

        <div className="stat-card">

          <div className="stat-icon red">
            ₹
          </div>

          <div>

            <p>Average Balance</p>

            <h2>
              {loading
                ? "..."
                : `₹${averageBalance.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
            </h2>

            <span>
              Per account
            </span>

          </div>

        </div>

      </div>


      {/* Account Overview */}

      <div className="dashboard-card account-overview">

        <div className="card-header">

          <div>

            <h3>Account Overview</h3>

            <p>
              Real accounts from PostgreSQL
            </p>

          </div>

          <button
            className="view-btn"
            onClick={loadDashboard}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

        </div>


        {/* Loading */}

        {loading && (
          <div className="dashboard-loading">
            Loading accounts...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="dashboard-empty">

            <h3>
              Unable to Load Accounts
            </h3>

            <p>
              Make sure FastAPI and PostgreSQL are running.
            </p>

          </div>
        )}


        {/* No Accounts */}

        {!loading &&
          !error &&
          accounts.length === 0 && (
            <div className="dashboard-empty">

              <h3>
                No Accounts Found
              </h3>

              <p>
                There are currently no bank accounts
                in the PostgreSQL database.
              </p>

            </div>
          )}


        {/* Accounts */}

        {!loading &&
          !error &&
          accounts.length > 0 && (

            <div className="account-list">

              {accounts
                .slice(0, 10)
                .map((account) => (
                  <AccountCard
                    key={account.account_number}
                    account={account}
                  />
                ))}

            </div>

          )}

      </div>

    </div>
  );
}

export default Dashboard;