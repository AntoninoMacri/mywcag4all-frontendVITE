import { createSlice } from "@reduxjs/toolkit";

export const websiteSlice = createSlice({
  name: "website",
  initialState: {
    website: {},
    websites: [],
    page: 1,
  },
  reducers: {
    setWebsites: (state, action) => {
      state.websites = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = state.websites.find((website) => website._id === action.payload.id);
    },
    setFilters: (state, action) => {
      state.website = {
        ...state.website,
        filters: {
          filter_word: "",
          filter_isApplicable: null,
          filter_isMet: null,
          filter_parent_tag: null,
          filter_tag: null,
          filter_wcagLevel: null,
          filter_category: null,
          filter_page: 1,
        },
        tests_filtered: [],
      };
    },
    setFilteredTestData: (state, action) => {
      state.website.tests_filtered = state.website.tests;
    },
    removeWebsite: (state) => {
      state.website = {};
    },
    updatePage: (state, action) => {
      state.page = action.payload.index;
    },
    updateCriterion: (state, action) => {

      const { sectionIndex, guidelineIndex, criterionIndex, isMet, isApplicable } = action.payload;
      const section = (state.website.sections.findIndex((section) => section.index === sectionIndex));
      const guideline = (state.website.sections[section].guidelines.findIndex((guideline) => guideline.index === guidelineIndex));
      const criterion = (state.website.sections[section].guidelines[guideline].criteria.findIndex((criterion) => criterion.index === criterionIndex));

      if (section >= 0 && guideline >= 0 && criterion >= 0) {
        state.website.sections[section].guidelines[guideline].criteria[criterion].isMet = isMet;
        state.website.sections[section].guidelines[guideline].criteria[criterion].isApplicable = isApplicable;
      }
    },
    updateTest: (state, action) => {
      const { testIndex, isMet, isApplicable } = action.payload;
      const test = (state.website.tests.findIndex((test) => test.index === testIndex));
      if (test >= 0) {
        state.website.tests_filtered[test].isMet = isMet;
        state.website.tests_filtered[test].isApplicable = isApplicable;
        state.website.tests[test].isMet = isMet;
        state.website.tests[test].isApplicable = isApplicable;
      }
    },
    updateWebsiteResults: (state, action) => {
      state.website.results = action.payload.results;
    },
    //filters for tests
    updateTestFilterWord: (state, action) => {
      state.website.filters.filter_word = action.payload.word;
    },
    updateTestFilterIsApplicable: (state, action) => {
      state.website.filters.filter_isApplicable = action.payload.value;
    },
    updateTestFilterIsPassed: (state, action) => {
      state.website.filters.filter_isMet = action.payload.value;
    },
    updateTestFilterLevel: (state, action) => {
      state.website.filters.filter_wcagLevel = action.payload.value !== "" ? action.payload.value : null;
    },
    updateTestFilterType: (state, action) => {
      state.website.filters.filter_category = action.payload.value !== "" ? action.payload.value : null;
    },
    updateTestFilterTag: (state, action) => {
      state.website.filters.filter_tag = action.payload.tag;
    },
    updateTestParentFilterTag: (state, action) => {
      state.website.filters.filter_parent_tag = action.payload.tag;
    },
    resetTestFilter: (state) => {
      state.website.filters.filter_word = "";
      state.website.filters.filter_isApplicable = null;
      state.website.filters.filter_isMet = null;
      state.website.filters.filter_parent_tag = null;
      state.website.filters.filter_tag = null;
      state.website.filters.filter_wcagLevel = null;
      state.website.filters.filter_category = null;
      state.website.filters.filter_page = 1;
      state.website.tests_filtered = state.website.tests;
    },
    updateTestFilterPage: (state, action) => {
      state.website.filters.filter_page = action.payload.index;
    },
    filterTestData: (state) => {
      state.website.tests_filtered = {};
      state.website.tests_filtered = state.website.tests.filter(
        (test) =>
          (state.website.filters.filter_word === undefined || state.website.filters.filter_word === ""
            ? true
            : test.title
              .toLowerCase()
              .includes(state.website.filters.filter_word.toLowerCase()))
          &&
          (state.website.filters.filter_isApplicable === undefined ||
            state.website.filters.filter_isApplicable === null
            ? true
            : test.isApplicable === state.website.filters.filter_isApplicable) &&
          (state.website.filters.filter_isMet === undefined || state.website.filters.filter_isMet === null
            ? true
            : test.isMet === state.website.filters.filter_isMet) &&
          (state.website.filters.filter_wcagLevel === undefined || state.website.filters.filter_wcagLevel === null
            ? true
            : test.wcagLevel === state.website.filters.filter_wcagLevel) &&
          (state.website.filters.filter_category === undefined || state.website.filters.filter_category === null
            ? true
            : test.category === state.website.filters.filter_category) &&
          (state.website.filters.filter_parent_tag === undefined ||
            state.website.filters.filter_parent_tag === null
            ? true
            : test.tags.includes(state.website.filters.filter_parent_tag)) &&
          (state.website.filters.filter_tag === undefined || state.website.filters.filter_tag === null
            ? true
            : test.tags.includes(state.website.filters.filter_tag))
      );
    },
  },
});

export const {
  removeWebsite,
  updatePage,
  setWebsites,
  setWebsite,
  setFilters,
  updateCriterion,
  updateTest,
  updateTestFilterWord,
  updateTestFilterIsApplicable,
  updateTestFilterIsPassed,
  updateTestFilterLevel,
  updateTestFilterTag,
  updateTestParentFilterTag,
  updateTestFilterType,
  updateTestFilterPage,
  resetTestFilter,
  setFilteredTestData,
  filterTestData,
  updateWebsiteResults } = websiteSlice.actions;
export default websiteSlice.reducer;
