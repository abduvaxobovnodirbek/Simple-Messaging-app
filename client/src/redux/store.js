import { configureStore } from "@reduxjs/toolkit";
import user from "./users/user";
export const store = configureStore({
  reducer: {
    users: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
