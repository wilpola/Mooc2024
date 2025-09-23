// Notification reducer

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NotificationProps {
  message: string | null;
}

const initialState: NotificationProps = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearNotification(state) {
      state.message = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
