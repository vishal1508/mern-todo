import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        loading:false,
        error:null
    },
    reducers:{
        signInStart  : (state) => {
            state.loading = true,
            state.error = null;
        },
        signInSuccess :(state,action) => {
            state.loading = false,
            state.error = null,
            state.currentUser = action.payload
        },
        signInFailure : (state,action) => {
            state.loading = false,
            state.error = action.payload
        },
        updateStart:(state) => {
            state.loading = true,
            state.error = null
        },
        updateSuccess:(state,action)=>{
            state.loading = false,
            state.error = null,
            state.currentUser = action.payload
        },
        updateFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        }
    }
});

export const {signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure} = userSlice.actions;

export default userSlice.reducer;