import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userid: null,
    enableUpdate: null,
    viewMode: null
}
export const Slice = createSlice({
    name: 'uid',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userid = action.payload;
        },
        setEnableUpdate: (state, action) => {
            state.enableUpdate = action.payload;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
    },
})
export const { setUserId, setEnableUpdate, setViewMode } = Slice.actions

export default Slice.reducer