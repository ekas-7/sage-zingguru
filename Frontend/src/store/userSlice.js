import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null, // Store the unique ID of the authenticated user
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload;
        },
        clearUser: (state) => {
            state.uid = null;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
