import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../services/Api";

export const checkLogin = createAsyncThunk("general/checkLogin", async () => {
  const response = await Api.check();
  return response.data;
});

const initialState = {
  isLoggedIn: "loading",
  email: "",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: {
    [checkLogin.pending]: (state) => {
      state.isLoggedIn = "loading";
    },
    [checkLogin.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [checkLogin.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setEmail } = generalSlice.actions;

export default generalSlice.reducer;
