import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: JSON.parse(localStorage.getItem("form")) || {},
  wordData: JSON.parse(localStorage.getItem("wordData")) || [],
  diacritics: [],
  morphological_info: {},
  semantic_info: [],
  semantic_info_obj: {},
  collocates: [],
  collocates_obj: {},
  meaning: {},
  image_obj: {},
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ code, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const assignedWords = createAsyncThunk(
  "user/assignedWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Word",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchDataWithState = createAsyncThunk(
  "user/fetchDataWithState",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const payload = { ...user.form };
      console.log(payload);
      delete payload._id;

      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Word",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
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
    updateSemanticInfo: (state, action) => {
      if (action.payload.index !== null) {
        state.semantic_info[action.payload.index] = state.semantic_info_obj;
      } else {
        state.semantic_info = [...state.semantic_info, state.semantic_info_obj];
      }
    },
    updateSemanticInfoObj: (state, action) => {
      if (action.payload.name === "collocates") {
        state.semantic_info_obj[action.payload.name] = state.collocates;
      } else {
        state.semantic_info_obj[action.payload.name] = action.payload.value;
      }
    },
    updateCollocatesObj: (state, action) => {
      state.collocates_obj[action.payload.name] = action.payload.value;
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
    clearCollocatesObj: (state) => {
      state.collocates_obj = {};
    },
    clearSemanticInfoObj: (state) => {
      state.semantic_info_obj = {};
    },
    updateMeaning: (state, action) => {
      state.meaning = action.payload.arr || {
        ...state.meaning,
        [action.payload.name]: action.payload.value,
      };
    },
    clearForm: (state) => {
      state.form = {};
      state.collocates = [];
      localStorage.removeItem("form");
    },
    clearSemanticInfo: (state) => {
      state.semantic_info = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.auth = true;
        state.data = data;

        const wordData = data.assigned_words.map((item) => ({
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));

        state.wordData = wordData;

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("wordData", JSON.stringify(wordData));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(assignedWords.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(assignedWords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedWords.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(getWord.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.loading = false;
        state.form = data;
        state.semantic_info = data.semantic_info;
        state.morphological_info = data.morphological_info;
        state.diacritics = data.diacritics;
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(getWord.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(fetchDataWithState.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDataWithState.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the response here if needed
        console.log(action.payload);
      })
      .addCase(fetchDataWithState.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
  },
});

// Export Actions and Reducer
export const {
  logout,
  updateForm,
  updateDiacritics,
  updateMorphologicalInfo,
  updateSemanticInfo,
  updateSemanticInfoObj,
  updateCollocates,
  updateCollocatesObj,
  clearCollocates,
  clearCollocatesObj,
  clearSemanticInfoObj,
  updateMeaning,
  clearForm,
  clearSemanticInfo,
} = userSlice.actions;

export default userSlice.reducer;
