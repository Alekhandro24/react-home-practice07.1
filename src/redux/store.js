import { configureStore } from '@reduxjs/toolkit';
import { goodsApi } from './goodsApi';

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  // логіка,яка виконується в момент запуску екшена до виконання
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware().concat(goodsApi.middleware),
});
