import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  pageLoading: false,
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
  verbs: [],
  nouns: [],
  assigned_functional_words: [],
  saved: false,
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
export const assignedVerbs = createAsyncThunk(
  "user/assignedVerbs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Verb",
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
export const assignedFunctionalWords = createAsyncThunk(
  "user/assignedFunctionalWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/FunctionalWord",
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
      // console.log(wordId);
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

export const getVerb = createAsyncThunk(
  "user/getVerb",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      // console.log(wordId);
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Verb/${wordId}`,
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
export const get_functional_words = createAsyncThunk(
  "user/get_functional_words",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      // console.log(wordId);
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/FunctionalWord/${wordId}`,
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
      const id = payload._id;
      delete payload._id;

      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word/${id}`,
        {
          method: "PUT",
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
      return rejectWithValue({ message: "error here" });
    }
  }
);
export const fetchDataWithStateVirb = createAsyncThunk(
  "user/fetchDataWithStateVirb",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const payload = { ...user.form };
      const id = payload._id;
      delete payload._id;

      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Verb/${id}`,
        {
          method: "PUT",
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
      return rejectWithValue({ message: "error here" });
    }
  }
);
export const fetchDataWithStateFunctional = createAsyncThunk(
  "user/fetchDataWithStateFunctional",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const payload = { ...user.form };
      const id = payload._id;
      delete payload._id;
      console.log(payload);

      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/FunctionalWord/${id}`,
        {
          method: "PUT",
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
      return rejectWithValue({ message: "error here" });
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
      console.log(JSON.parse(JSON.stringify(state.form)));
    },

    updateDiacritics: (state, action) => {
      // console.log(action.payload);
      state.diacritics = action.payload;
    },
    deleteDiacriticExample: (state, action) => {
      console.log("index on delete example", action.payload.index);
      if (action.payload.index) {
        state.diacritics = state.diacritics.filter(
          (item) => item !== state.diacritics[action.payload.index]
        );
        console.log("diacritics after delete example", state.diacritics);
      }
    },
    updateMorphologicalInfo: (state, action) => {
      state.morphological_info[action.payload.name] = action.payload.value;
    },
    //verb case
    deleteMorphologicalInfoExample: (state, action) => {
      console.log(state.morphological_info);
      if (action.payload.index) {
        state.morphological_info.derivational_forms =
          state.morphological_info.derivational_forms.filter(
            (item) =>
              item !==
              state.morphological_info.derivational_forms[action.payload.index]
          );
      }
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
    clearMeaning: (state, action) => {
      state.meaning = {};
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
    deleteSemanticInfo: (state, action) => {
      if (action.payload.index) {
        state.semantic_info = state.semantic_info?.filter(
          (item) => item !== state.semantic_info[action.payload.index]
        );
        clearSemantic_info_obj();
      }
    },
    deleteSemanticInfoMeaningExample: (state, action) => {
      if (action.payload.index) {
        state.meaning.example = state.meaning.example?.filter(
          (item) => item !== state.meaning.example[action.payload.index]
        );
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
      console.log("collocates", JSON.parse(JSON.stringify(state.collocates)));
    },
    deleteCollocate: (state, action) => {
      if (action.payload.index) {
        state.collocates = state.collocates?.filter(
          (item) => item !== state.collocates[action.payload.index]
        );
        clearCollocates_Obj();
      }
    },
    deleteCollocateExample: (state, action) => {
      console.log(action.payload.index);
      if (action.payload.index) {
        state.collocates_obj.example = state.collocates_obj.example?.filter(
          (item) => item !== state.collocates_obj.example[action.payload.index]
        );
      }
      console.log(state);
    },
    clearCollocates: (state) => {
      state.collocates = [];
    },
    clearCollocates_Obj: (state) => {
      state.collocates_obj = {};
    },
    clearForm: (state) => {
      state.diacritics = [];
      state.morphological_info = {};
      state.semantic_info_obj = {};
      state.semantic_info = [];
      state.collocates_obj = {};
      state.collocates = [];
      state.form = {};
    },
    clearSemantic_info: (state) => {
      state.semantic_info = [];
    },
    clearSavedState: (state) => {
      state.saved = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("helllllllllllllllllllllo");
        const { data } = action.payload;
        state.loading = false;
        state.auth = true;
        state.data = data;
        let wordData = [];
        const words = data.assigned_words.map((item) => ({
          id: item._id,
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));
        console.log(data);
        const verbs = data.assigned_verbs.map((item) => ({
          id: item._id,
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));
        const assigned_functional_words = data.assigned_functional_words.map(
          (item) => ({
            id: item._id,
            word: item.text,
            status: item.state,
          })
        );
        state.assigned_functional_words = data.assigned_functional_words.map(
          (item) => item.text
        );
        state.nouns = data.assigned_words.map((item) => item.text);
        state.verbs = data.assigned_verbs.map((item) => item.text);
        console.log("الكلمات الوظيفية", state.assigned_functional_words);
        console.log(state.nouns);
        console.log(state.verbs);

        wordData = [...words, ...assigned_functional_words, ...verbs];
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
      .addCase(assignedVerbs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(assignedVerbs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedVerbs.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(assignedFunctionalWords.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(assignedFunctionalWords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedFunctionalWords.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(getWord.pending, (state) => {
        state.pageLoading = true;
        state.error = false;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.pageLoading = false;
        state.form = data;
        console.log(data);
        state.semantic_info = data.semantic_info;
        state.morphological_info = data.morphological_info;
        state.diacritics = data.diacritics;
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(getWord.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(getVerb.pending, (state) => {
        state.pageLoading = true;
        state.error = false;
      })
      .addCase(getVerb.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.pageLoading = false;
        state.form = data;
        state.semantic_info = data.semantic_info;
        state.morphological_info = data.morphological_info;
        state.diacritics = data.diacritics;
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(getVerb.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(get_functional_words.pending, (state) => {
        state.pageLoading = true;
        state.error = false;
      })
      .addCase(get_functional_words.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        console.log(data);
        state.pageLoading = false;
        state.form = data;
        state.diacritics = data.diacritics;
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(get_functional_words.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(fetchDataWithState.pending, (state) => {
        console.log("in pending state");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataWithState.fulfilled, (state, action) => {
        console.log("in fulfilled state");
        state.loading = false;
        state.saved = true;
        // console.log(action.payload.data);
        // state.loading = false;
        // state.form = action.payload.data.data;
        // state.semantic_info = state.form.semantic_info;
        // state.morphological_info = state.form.morphological_info;
        // state.diacritics = state.form.diacritics;
        // localStorage.setItem("form", JSON.stringify(action.payload.data.data));
      })
      .addCase(fetchDataWithState.rejected, (state, action) => {
        console.log("in rejected state");
        // console.log(action);
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchDataWithStateVirb.pending, (state) => {
        console.log("in pending state");
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDataWithStateVirb.fulfilled, (state, action) => {
        console.log("in fulfilled state");
        state.loading = false;
        state.saved = true;
        // console.log(action.payload);
      })
      .addCase(fetchDataWithStateVirb.rejected, (state, action) => {
        console.log("in rejected state");
        // console.log(action);
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchDataWithStateFunctional.pending, (state) => {
        console.log("in pending state");
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDataWithStateFunctional.fulfilled, (state, action) => {
        console.log("in fulfilled state");
        state.loading = false;
        state.saved = true;
        // console.log(action.payload);
      })
      .addCase(fetchDataWithStateFunctional.rejected, (state, action) => {
        console.log("in rejected state");
        // console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  login,
  updateForm,
  updateDiacritics,
  updateDiacriticswithRecord,
  deleteDiacriticExample,
  updateMorphologicalInfo,
  deleteMorphologicalInfoExample,
  updateSemantic_info_obj,
  updateSemantic_infowithImage,
  clearSemantic_info_obj,
  updateSemantic_info,
  deleteSemanticInfo,
  deleteSemanticInfoMeaningExample,
  clearSemanticInfo,
  updateMeaning,
  clearMeaning,
  updateImage_obj,
  updateCollocates,
  deleteCollocate,
  deleteCollocateExample,
  clearCollocates,
  updateCollocates_obj,
  clearCollocates_Obj,
  clearForm,
  clearSavedState,
} = userSlice.actions;

export default userSlice.reducer;
