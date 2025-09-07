import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        loading: false,
        user: null
    },
    reducers:{
        //actions
        setloading:(state, action) =>{
            state.loading = action.payload;
        },
        setAuthUser: (state, action) =>{
            state.user = action.payload;
        }
    }
});
export const {setloading, setAuthUser} = authSlice.actions;
export default authSlice.reducer;