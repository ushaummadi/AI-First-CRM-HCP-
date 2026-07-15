import { createSlice } from "@reduxjs/toolkit";

const hcpSlice = createSlice({
  name: "hcp",
  initialState: {
    hcps: [],
  },
  reducers: {
    setHcps: (state, action) => {
      state.hcps = action.payload;
    },
  },
});

export const { setHcps } = hcpSlice.actions;
export default hcpSlice.reducer;