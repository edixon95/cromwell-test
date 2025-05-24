import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: 0,
    username: "",
    email: "",
    isChecking: true,
    isLoggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { _id, username, email } = action.payload;
            state._id = _id;
            state.username = username;
            state.email = email;
            state.isLoggedIn = true;
        },
        setIsChecking(state, action) {
            state.isChecking = action.payload;
        },
        logoutUser(state) {
            state._id = 0;
            state.username = "";
            state.email = "";
            state.isLoggedIn = false;
            state.isChecking = false;
        }

    }
});

export const { setUser, logoutUser, setIsChecking } = userSlice.actions;
export const userReducer = userSlice.reducer;