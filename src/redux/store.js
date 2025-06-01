import { configureStore } from '@reduxjs/toolkit'
import Slice from '../redux/slice'

export const store = configureStore({
    reducer: {
        uid: Slice
    },
})