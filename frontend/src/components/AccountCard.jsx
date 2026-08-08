import "./AccountCard.css";

function AccountCard({ account }) {
  if (!account) {
    return null;
  }

  return (
    <div className="account-card">

      {/* Account Header */}
      <div className="account-card-header">

        <div className="account-card-icon">
          ₹
        </div>

        <div className="account-card-title">
          <span>Bank Account</span>

          <strong>
            #{account.account_number}
          </strong>
        </div>

        <span className="account-card-status">
          Active
        </span>

      </div>


      {/* Account Holder */}
      <div className="account-card-holder">

        <span>Account Holder</span>

        <strong>
          {account.holder_name}
        </strong>

      </div>


      {/* Balance */}
      <div className="account-card-balance">

        <span>Available Balance</span>

        <h2>
          ₹
          {Number(account.balance || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>

      </div>


      {/* Footer */}
      <div className="account-card-footer">

        <span>
          Account No.
        </span>

        <strong>
          {account.account_number}
        </strong>

      </div>

    </div>
  );
}

export default AccountCard;