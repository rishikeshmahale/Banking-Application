import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null,
    username: localStorage.getItem("username") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      (state.accessToken = action.payload.accessToken),
        (state.refreshToken = action.payload.refreshToken),
        (state.role = action.payload.role),
        (state.username = action.payload.username),
        (state.isAuthenticated = true); 

      //   saving the data in localstorage

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("username", action.payload.username);
    },
    

    logout: (state) => {
          state.accessToken = null,
          state.refreshToken = null,
          state.role = null,
          state.author = null,
          state.isAuthenticated = null

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
      }
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;