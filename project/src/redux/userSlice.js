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
  semantic_info: [],
  semantic_info_obj: {},
  collocates: [],
  collocates_obj: {},
  meaning: {},
  image_obj: {},
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

export const updateMeaningAsync = createAsyncThunk(
  "yourSlice/updateMeaning",
  async (payload, { dispatch, getState }) => {
    // Synchronous update
    dispatch(updateMeaning(payload));

    // Logging after update for debug
    console.log("Updated meaning:", getState().yourSlice.meaning);

    return Promise.resolve(); // Resolve the promise
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
      console.log("form: ", JSON.parse(JSON.stringify(state.form)));
    },
    updateDiacritics: (state, action) => {
      state.diacritics = action.payload;
    },
    updateMorphologicalInfo: (state, action) => {
      console.log(action.payload);
      state.morphological_info[action.payload.name] = action.payload.value;
      console.log(
        "morphological_info: ",
        JSON.parse(JSON.stringify(state.morphological_info))
      );
    },
    updateCollocates_obj: (state, action) => {
      state.collocates_obj[action.payload.name] = action.payload.value;
      console.log(
        "collocates_obj: ",
        JSON.parse(JSON.stringify(state.collocates_obj))
      );
    },
    updateSemantic_info_obj: (state, action) => {
      state.semantic_info_obj[action.payload.name] = action.payload.value;
      console.log(
        "semantic_info_obj: ",
        JSON.parse(JSON.stringify(state.semantic_info_obj))
      );
    },
    clearSemantic_info_obj: (state) => {
      state.semantic_info_obj = {};
      console.log(
        "semantic_info_obj: ",
        JSON.parse(JSON.stringify(state.semantic_info_obj))
      );
    },
    updateMeaning: (state, action) => {
      state.meaning[action.payload.name] = action.payload.value;
      console.log("meaning: ", JSON.parse(JSON.stringify(state.meaning)));
    },
    updateImage_obj: (state, action) => {
      state.image_obj[action.payload.name] = action.payload.value;
      console.log(state.image_obj);
      updateMeaning({ name: "image", value: state.image_obj });
      console.log("image_obj: ", JSON.parse(JSON.stringify(state.image_obj)));
      console.log("meaning: ", JSON.stringify(state.meaning));
    },
    updateSemantic_info: (state) => {
      console.log("-------------------------------------------");
      state.semantic_info = [...state.semantic_info, state.semantic_info_obj];
      console.log("-------------------------------------------");
      console.log(
        "semantic_info: ",
        JSON.parse(JSON.stringify(state.semantic_info))
      );
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
        state.semantic_info = state.form.semantic_info;
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

export const {
  login,
  updateForm,
  updateMorphologicalInfo,
  updateDiacritics,
  updateCollocates_obj,
  updateSemantic_info_obj,
  clearSemantic_info_obj,
  updateSemantic_info,
  updateMeaning,
  updateImage_obj,
} = userSlice.actions;

export default userSlice.reducer;
