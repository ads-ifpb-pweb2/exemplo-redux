import { configureStore } from "@reduxjs/toolkit";
import tarefaReducer from "../features/tarefa-slice";

export const store = configureStore({
  reducer: {
    planejamento: tarefaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
