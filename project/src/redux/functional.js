import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "https://arabic-data-collector.onrender.com/api/v1/FunctionalWord";

// POST request - Create a functional word
export const postFunctionalWord = createAsyncThunk(
  "functionalWord/postFunctionalWord",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);
export const fetchFunctionalWords = createAsyncThunk(
  "functionalWord/fetchFunctionalWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

// PUT request - Save or update a functional word
export const saveFunctionalWord = createAsyncThunk(
  "functionalWord/saveFunctionalWord",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

const initialState = {
  error: false,
  data: null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: JSON.parse(localStorage.getItem("form")) || {},
  functionalData: [], 
  diacritics: [],  
  Linguistic: [{ text: "", source: "" }], 
  contextual_indicators: [{ text: "", source: "" }],  
  Structural_association: [{ text: "", source: "" }],   
};
export const functionalSlice = createSlice({
  name: "Functional",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.auth = false;
      state.loading = false;
      state.message = "";
      state.form = {};
      state.functionalData = [];
      state.diacritics = [];
      state.Linguistic = [{ text: "", source: "" }];
      state.contextual_indicators = [{ text: "", source: "" }];
      state.Structural_association = [{ text: "", source: "" }];
      localStorage.clear();
    },
    updateForm: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    },
    updateDiacritics: (state, action) => {
      state.diacritics = action.payload;
    },
    updateLinguistic: (state, action) => {
      if (action.payload.index !== null) {
        state.Linguistic[action.payload.index] = {
          text: action.payload.text,
          source: action.payload.source,
        };
      } else {
        state.Linguistic.push({ text: "", source: "" });
      }
      localStorage.setItem("Linguistic", JSON.stringify(state.Linguistic));
    },
    updateContextualIndicators: (state, action) => {
      if (action.payload.index !== null) {
        state.contextual_indicators[action.payload.index] = {
          text: action.payload.text,
          source: action.payload.source,
        };
      } else {
        state.contextual_indicators.push({ text: "", source: "" });
      }
      localStorage.setItem(
        "contextual_indicators",
        JSON.stringify(state.contextual_indicators)
      );
    },
    updateStructuralAssociation: (state, action) => {
      if (action.payload.index !== null) {
        state.Structural_association[action.payload.index] = {
          text: action.payload.text,
          source: action.payload.source,
        };
      } else {
        state.Structural_association.push({ text: "", source: "" });
      }
    //   localStorage.setItem(
    //     "Structural_association",
    //     JSON.stringify(state.Structural_association)
    //   );
    },
    updateMeaning: (state, action) => {
      const { name, value } = action.payload;
      if (name && value) {
        state.meaning[name] = value;
      }
    },
    clearForm: (state) => {
      state.form = {};
      state.functionalData = [];
      state.diacritics = [];
      state.Linguistic = [{ text: "", source: "" }];
      state.contextual_indicators = [{text: "", source: "" }];
      state.Structural_association = [{ text: "", source: "" }];
      localStorage.removeItem("form");
      localStorage.removeItem("diacritics");
      localStorage.removeItem("Linguistic");
      localStorage.removeItem("contextual_indicators");
      localStorage.removeItem("Structural_association");
    },
    clearContextualIndicators: (state) => {
      state.contextual_indicators = [{ text: "", source: "" }];
    },
    clearStructuralAssociation: (state) => {
      state.Structural_association = [{ text: "", source: "" }];
    },
  },
  extraReducers: (builder) => {
    builder
      // POST request handler
      .addCase(postFunctionalWord.pending, (state) => {
        state.loading = true;
      })
      .addCase(postFunctionalWord.fulfilled, (state, action) => {
        state.loading = false;
        state.functionalData.push(action.payload); 
        state.message = "";
      })
      .addCase(postFunctionalWord.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(fetchFunctionalWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFunctionalWords.fulfilled, (state, action) => {
        state.loading = false;
        state.functionalData = action.payload;  
      })
      .addCase(fetchFunctionalWords.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // PUT request handler
      .addCase(saveFunctionalWord.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFunctionalWord.fulfilled, (state, action) => {
        state.loading = false;
        state.functionalData = state.functionalData.map((data) =>
          word.text === action.payload.text ? action.payload : data
        );
        state.message = "";
      })
      .addCase(saveFunctionalWord.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const {
  logout,
  updateForm,
  updateDiacritics,
  updateLinguistic,
  updateContextualIndicators,
  updateStructuralAssociation,
  updateMeaning,
  clearForm,
  clearContextualIndicators,
  clearStructuralAssociation,
  clearMeaning,
} = functionalSlice.actions;

export  let functionalreducer=functionalSlice.reducer;
