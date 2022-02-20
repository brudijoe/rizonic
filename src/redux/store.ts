import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dataReducer from "../redux/dataSlice";
import employeeReducer from "../redux/employeeSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    employee: employeeReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;