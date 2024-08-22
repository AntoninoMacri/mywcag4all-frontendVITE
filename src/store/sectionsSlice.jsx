import { createSlice } from "@reduxjs/toolkit";

export const sectionsSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
  },
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload.data;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;
