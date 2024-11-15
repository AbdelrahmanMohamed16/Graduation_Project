import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: JSON.parse(localStorage.getItem("form")) || {},
  wordData: localStorage.getItem("wordData") || [],
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
export const assignedWords = createAsyncThunk(
  "user/assignedWords",
  async ({ _ }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const getWord = createAsyncThunk(
  "user/getWord",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word/${wordId}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const fetchDataWithState = createAsyncThunk(
  "user/fetchDataWithState",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const someState = { ...state.user.form }; // Clone the state to avoid mutation
      delete someState._id;
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Word",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(someState),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data || { message: "Failed to fetch data" });
      }

      return data; // Only return the data directly, not as an object { data }
    } catch (error) {
      // Return a custom error if something goes wrong
      return rejectWithValue({ message: error.message || "An error occurred" });
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
    updateDiacritics: (state, action) => {
      state.diacritics = action.payload;
    },
    updateMorphologicalInfo: (state, action) => {
      state.morphological_info[action.payload.name] = action.payload.value;
    },
    updateCollocates_obj: (state, action) => {
      state.collocates_obj[action.payload.name] = action.payload.value;
    },
    updateSemantic_info_obj: (state, action) => {
      if (action.payload.name === "collocates") {
        state.semantic_info_obj[action.payload.name] = state.collocates;
      } else {
        state.semantic_info_obj[action.payload.name] = action.payload.value;
      }
    },
    clearSemantic_info_obj: (state) => {
      state.semantic_info_obj = {};
    },
    updateMeaning: (state, action) => {
      if (action.payload.arr !== null) {
        state.meaning = action.payload.arr;
      } else {
        state.meaning[action.payload.name] = action.payload.value;
      }
    },
    updateImage_obj: (state, action) => {
      state.image_obj[action.payload.name] = action.payload.value;
      updateMeaning({ name: "image", value: state.image_obj });
    },
    updateSemantic_info: (state, action) => {
      if (action.payload.index !== null) {
        state.semantic_info[action.payload.index] = state.semantic_info_obj;
      } else {
        state.semantic_info = [...state.semantic_info, state.semantic_info_obj];
      }
    },
    updateCollocates: (state, action) => {
      if (action.payload.collocatesIndex !== null) {
        state.collocates[action.payload.collocatesIndex] = state.collocates_obj;
      } else {
        if (action.payload.arr) {
          state.collocates = action.payload.arr;
        } else {
          state.collocates = [...state.collocates, state.collocates_obj];
        }
      }
    },
    clearCollocates: (state) => {
      state.collocates = [];
    },
    clearCollocates_Obj: (state) => {
      state.collocates_obj = {};
    },
    clearForm: (state) => {
      state.form = {};
    },
    clearSemantic_info: (state) => {
      state.semantic_info = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.loading = false;
        // state.data = action.payload.data;
        let data = action.payload.data.assigned_words.map((item) => ({
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));
        state.wordData = data;
        state.auth = true;
        state.data = action.payload.data;
        localStorage.setItem("authToken", action.payload.data.token);
        localStorage.setItem("wordData", data);
        localStorage.getItem("wordData");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });
    builder
      .addCase(getWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload.data.data;
        state.semantic_info = state.form.semantic_info;
        state.morphological_info = state.form.morphological_info;
        state.diacritics = state.form.diacritics;
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
    builder
      .addCase(fetchDataWithState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataWithState.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(action.payload.data);
        // state.loading = false;
        // state.form = action.payload.data.data;
        // state.semantic_info = state.form.semantic_info;
        // state.morphological_info = state.form.morphological_info;
        // state.diacritics = state.form.diacritics;
        // localStorage.setItem("form", JSON.stringify(action.payload.data.data));
      })
      .addCase(fetchDataWithState.rejected, (state, action) => {
        // state.loading = false;
        // state.error = true;
        // state.token = null;
        // state.user = null;
        // state.message = action.payload.message;
        console.log(action.payload);
      });
    builder
      .addCase(assignedWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignedWords.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedWords.rejected, (state, action) => {
        console.log(assignedWords.rejected);
        console.log(action.payload);
      });
  },
});

export const {
  login,
  updateForm,
  updateMorphologicalInfo,
  updateDiacritics,
  updateDiacriticswithRecord,
  updateCollocates_obj,
  updateSemantic_info_obj,
  updateSemantic_infowithImage,
  clearSemantic_info_obj,
  updateSemantic_info,
  updateMeaning,
  updateImage_obj,
  updateCollocates,
  clearCollocates,
  clearCollocates_Obj,
  clearForm,
  clearSemantic_info,
} = userSlice.actions;

export default userSlice.reducer;
