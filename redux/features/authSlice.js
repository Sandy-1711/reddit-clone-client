import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        isAuth: false,
        user: null,
    }
}
const getLocalStorage = (name) => {
    if (typeof window !== 'undefined') {
        // console.log('oauhfi');
        return JSON.parse(window.localStorage.getItem(name));
    }
    // console.log('iugeuwgf gug o');
    return null;
};
// Helper function to set a cookie
const setLocalstorage = (name, value) => {
    window.localStorage.setItem(name, JSON.stringify(value));
};

// Helper function to get a cookie by name
const getCookie = (name) => {
    return JSON.parse(window.localStorage.getItem(name));
};
export const auth = createSlice({
    name: "auth",
    initialState: typeof window !== 'undefined' ? getLocalStorage('authState') || initialState : initialState,
    reducers: {
        logOut: () => {
            setLocalstorage('authState', initialState)
            return initialState;
        },
        logIn: (state, action) => {
            setLocalstorage('authState', { value: { isAuth: true, user: action.payload } });
            return {
                value: {
                    isAuth: true,
                    user: action.payload,
                }
            }
        }
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;