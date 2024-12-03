import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
    service: false,
    main: false,
    login: false
}

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.user = action.payload.user;
            state.service = action.payload.service;
            state.main = action.payload.main;
            state.login = action.payload.login;
        },
    }
});
  
export const { setPage } = pageSlice.actions;
  
export default pageSlice.reducer;