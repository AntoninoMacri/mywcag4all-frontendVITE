import { createSlice } from "@reduxjs/toolkit";

const tool_include_a_tool_class = (classes, class_id) => {
  for (let i = 0; classes && i < classes.length; i++) {
    if (classes[i]._id === class_id) {
      return true;
    }
  }
  return false;
};

export const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    filter_word: "",
    filter_class: null,
    filter_license: null,
    filter_page: 1,
    tools_data: [], // Inizializza come array vuoto
    tools_data_filtered: [], // Inizializza come array vuoto
    classes: [],
    licenses: {},
  },
  reducers: {
    setToolsData: (state, action) => {
      state.tools_data = action.payload.data;
      state.tools_data_filtered = action.payload.data;
    },
    setToolsDataClsses: (state, action) => {
      state.classes = action.payload.data;
    },
    setToolsDataLicenses: (state, action) => {
      state.licenses = action.payload.data;
    },
    updateToolFilterWord: (state, action) => {
      state.filter_word = action.payload.value;
    },
    updateToolFilterType: (state, action) => {
      state.filter_class = action.payload.value;
    },
    updateToolFilterLicense: (state, action) => {
      state.filter_license = action.payload.value;
    },
    filterTestData: (state) => {
      state.tools_data_filtered = {};
      state.tools_data_filtered = state.tools_data.filter(
        (tool) =>
          (state.filter_word === undefined || state.filter_word === ""
            ? true
            : tool.name.toLowerCase().includes(state.filter_word.toLowerCase())) &&
          (state.filter_class === undefined || state.filter_class === null || state.filter_class === ""
            ? true
            : tool_include_a_tool_class(tool.classes, state.filter_class))
      );
    },
    resetToolFilter: (state) => {
      state.filter_word = "";
      state.filter_class = null;
      state.filter_license = null;
      state.filter_page = 1;
      state.tools_data_filtered = state.tools_data;
    },
    updateToolsFilterPage: (state, action) => {
      state.filter_page = action.payload.index;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  updateToolFilterWord,
  updateToolFilterType,
  updateToolFilterLicense,
  updateToolFilterPage,
  resetToolFilter,
  setToolsData,
  filterTestData,
  setToolsDataClsses,
  setToolsDataLicenses,
  updateToolsFilterPage,
} = toolsSlice.actions;
export default toolsSlice.reducer;
