import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    interactions: [],
  },
  reducers: {
    setInteractions: (state, action) => {
      state.interactions = action.payload;
    },
  },
});

export const { setInteractions } = interactionSlice.actions;

export default interactionSlice.reducer;