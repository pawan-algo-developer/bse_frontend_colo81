import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableTwo: null, // true/false/null
  tableThree: null, // true/false/null
};

const omsStatusSlice = createSlice({
  name: "omsStatus",
  initialState,
  reducers: {
    setTableTwoStatus(state, action) {
      state.tableTwo = action.payload;
    },
    setTableThreeStatus(state, action) {
      state.tableThree = action.payload;
    },
  },
});

// Selector: returns false if any table is false, true if both true, null if any null
export const selectCombinedOmsStatus = (state) => {
  const { tableTwo, tableThree } = state.omsStatus;
  if (tableTwo === false || tableThree === false) return false;
  if (tableTwo === null || tableThree === null) return null;
  return true;
};

export const { setTableTwoStatus, setTableThreeStatus } =
  omsStatusSlice.actions;
export default omsStatusSlice.reducer;
