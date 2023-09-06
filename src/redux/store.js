import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './reducers/counterSlice'; // Impor reducer yang telah dibuat

const store = configureStore({
  reducer: {
    counter: counterReducer, // Gunakan reducer yang telah diimpor
  },
});

export default store;