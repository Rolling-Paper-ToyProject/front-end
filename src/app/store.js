import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

// createSlice({
//   // name : 'state이름~~',
//   // initalState: '값'
// })

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})