import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: {},
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ code, password }, { rejectWithValue }) => {
    console.log(
      JSON.stringify({
        code,
        password,
      })
    );
    try {
      const response = await fetch(
        "http://156.196.194.215:7070/api/v1/Auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("---------from logged out--------------");
      state.token = null;
      state.error = false;
      state.data = null;
      state.auth = false;
      state.loading = false;
      state.message = "";
      localStorage.clear();
    },
    updateForm: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.auth = true;
        localStorage.setItem("authToken", action.payload.data.token);
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log(action.payload);
      });
  },
});

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
