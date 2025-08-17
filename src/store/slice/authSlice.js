import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAdmin: localStorage.getItem("isAdmin") === "true" || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // For regular user login (replaces old setAuth)
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAdmin = false; // Ensure regular users are not admins
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.removeItem("isAdmin");
    },
    // For updating user data (e.g., on profile page)
    setUserData: (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // For admin login
    setAdminCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAdmin = true;
      state.user = { firstName: "Admin", email: "admin@example.com" }; // Placeholder admin user
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", "true");
      localStorage.removeItem("user"); // Clear regular user data
    },
    // For logging out both users and admins
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { setCredentials, setUserData, setAdminCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;