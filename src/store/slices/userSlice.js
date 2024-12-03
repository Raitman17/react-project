import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const initialState = {
    username: null,
    token: null,
    id: null,
};

const persistConfig = {
    key: 'root',
    storage,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.username = null;
            state.token = null;
            state.id = null;
        },
    }
});

const avcd = persistReducer(persistConfig, userSlice.reducer);

export const {setUser, removeUser} = userSlice.actions;

export default avcd;
