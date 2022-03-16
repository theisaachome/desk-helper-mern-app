import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// logout user
export const logout = createAsyncThunk("auth/logout",async()=>await authService.logout())

// create slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = false
        state.message = ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.isLoading = true })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user = null
            })
    }
})

// create and export

export const { reset } = authSlice.actions
export default authSlice.reducer