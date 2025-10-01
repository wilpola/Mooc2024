// Notification reducer

import { createSlice, type AnyAction, type PayloadAction, type ThunkDispatch } from "@reduxjs/toolkit";

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

export const { clearNotification } = notificationSlice.actions;

export function setNotification(message: string, time: number) {
  return async (dispatch: ThunkDispatch<NotificationProps, void, AnyAction>) => {
    dispatch({  
      type: "notification/setNotification",
      payload: message,
    });

    setTimeout(() => {
      dispatch({ type: "notification/clearNotification" });
    }, time * 1000);
  };
}


export default notificationSlice.reducer;
