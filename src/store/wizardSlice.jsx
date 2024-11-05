// wizardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestionIndex: 0,
  currentTestIndex: 0,
  showTests: false,
  // Altri stati necessari
};

const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
      state.showTests = false;
      state.currentTestIndex = 0;
    },
    startTests(state) {
      state.showTests = true;
    },
    nextTest(state) {
      if (state.currentTestIndex < state.tests.length - 1) {
        state.currentTestIndex += 1;
      } else {
        state.showTests = false;
        state.currentTestIndex = 0;
        state.currentQuestionIndex += 1;
      }
    },
    // Altri reducer se necessari
  },
});

export const { nextQuestion, startTests, nextTest } = wizardSlice.actions;
export default wizardSlice.reducer;
