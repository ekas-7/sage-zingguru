import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uid: null, // Store the unique ID of the authenticated user
    url: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload;
        },
        setUrl: (state,action) => {
            state.url = action.payload;
        },
        clearUrl: (state) => {
            state.url = "";
        },
        clearUser: (state) => {
            state.uid = null;
        }
    }
})

export const { setUser, clearUser,setUrl,clearUrl } = userSlice.actions;
export default userSlice.reducer;
