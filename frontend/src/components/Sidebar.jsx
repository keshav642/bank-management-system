import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h3>MAIN MENU</h3>}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">⌂</span>
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/accounts"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">▣</span>
          {!collapsed && <span>Accounts</span>}
        </NavLink>

        <NavLink
          to="/create-account"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">＋</span>
          {!collapsed && <span>Create Account</span>}
        </NavLink>

        <NavLink
          to="/deposit"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">↓</span>
          {!collapsed && <span>Deposit</span>}
        </NavLink>

        <NavLink
          to="/withdraw"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">↑</span>
          {!collapsed && <span>Withdraw</span>}
        </NavLink>

        <NavLink
          to="/transfer"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">⇄</span>
          {!collapsed && <span>Transfer Money</span>}
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">

        <div className="secure-icon">
          ✓
        </div>

        {!collapsed && (
          <div className="secure-text">
            <strong>Secure Banking</strong>
            <span>Your data is protected</span>
          </div>
        )}

      </div>

    </aside>
  );
}

export default Sidebar;