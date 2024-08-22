import { createSlice } from "@reduxjs/toolkit";

export const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    ranking: [],
    website: {},
    page_ranking: 1,
  },
  reducers: {
    setRanking: (state, action) => {
      state.ranking = action.payload;
    },
    updatePage: (state, action) => {
      state.page_ranking = action.payload.index;
    },
  },
});
// Action creators are generated for each case reducer function
export const { updatePage, setRanking } = rankingSlice.actions;
export default rankingSlice.reducer;
