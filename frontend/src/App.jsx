import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import CreateAccount from "./pages/CreateAccount";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";

import "./App.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={`app-layout ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >

        {/* Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main Content */}
        <main className="content">
          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Accounts */}
            <Route
              path="/accounts"
              element={<Accounts />}
            />

            {/* Create Account */}
            <Route
              path="/create-account"
              element={<CreateAccount />}
            />

            {/* Deposit */}
            <Route
              path="/deposit"
              element={<Deposit />}
            />

            {/* Withdraw */}
            <Route
              path="/withdraw"
              element={<Withdraw />}
            />

            {/* Transfer */}
            <Route
              path="/transfer"
              element={<Transfer />}
            />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;