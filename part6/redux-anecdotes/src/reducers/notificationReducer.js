import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export const setNotification = (msg, delay) => {
  return (dispatch) => {
    dispatch(showNotification(msg));

    setTimeout(() => {
      dispatch(showNotification(null));
    }, delay * 1000);
  };
};

export default notificationSlice.reducer;
