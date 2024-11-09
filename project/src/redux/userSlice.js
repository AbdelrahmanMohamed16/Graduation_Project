import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: JSON.parse(localStorage.getItem("form")) || {},
  diacritics: [],
  morphological_info: {},
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
        "https://arabic-data-collector.onrender.com/api/v1/Auth/login",
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
export const getWord = createAsyncThunk(
  "user/getWord",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      console.log(wordId);
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word/${wordId}`,
        {
          method: "get",
          headers: {
            Authorization: localStorage.getItem("authToken"),
            "Content-Type": "application/json",
          },
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
      console.log(action.payload);
      console.log(action.payload.name);
      console.log(action.payload.value);

      state.form[action.payload.name] = action.payload.value;
      console.log(JSON.parse(JSON.stringify(state.form)));
    },
    updateDiacritics: (state, action) => {
      state.diacritics = action.payload;
    },
    updateMorphologicalInfo: (state, action) => {
      console.log(action.payload);
      state.morphological_info[action.payload.name] = action.payload.value;
      console.log(JSON.parse(JSON.stringify(state.morphological_info)));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
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
    builder
      .addCase(getWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(action.payload.data);
        state.loading = false;
        state.form = action.payload.data.data;
        localStorage.setItem("form", JSON.stringify(action.payload.data.data));
      })
      .addCase(getWord.rejected, (state, action) => {
        // state.loading = false;
        // state.error = true;
        // state.token = null;
        // state.user = null;
        // state.message = action.payload.message;
        console.log(action.payload);
      });
  },
});

export const { login, updateForm, updateMorphologicalInfo, updateDiacritics } =
  userSlice.actions;

export default userSlice.reducer;
