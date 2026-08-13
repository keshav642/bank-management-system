import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all accounts
export const getAccounts = () => {
  return API.get("/accounts");
};

// Get single account
export const getAccount = (accountNumber) => {
  return API.get(`/accounts/${accountNumber}`);
};

// Create account
export const createAccount = (accountData) => {
  return API.post("/accounts", accountData);
};

// Delete account
export const deleteAccount = (accountNumber) => {
  return API.delete(`/accounts/${accountNumber}`);
};

// Deposit
export const depositMoney = (accountNumber, amount) => {
  return API.post(`/accounts/${accountNumber}/deposit`, {
    amount,
  });
};

// Withdraw
export const withdrawMoney = (accountNumber, amount) => {
  return API.post(`/accounts/${accountNumber}/withdraw`, {
    amount,
  });
};

// Transfer
export const transferMoney = (transferData) => {
  return API.post("/accounts/transfer", transferData);
};

export default API;