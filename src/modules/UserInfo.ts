import { createStore } from 'redux';


const initialState = {
    level: 0,
    accessToken: null,
    refreshToken: null,
    name: null
};

type InfoState = {
    level: number,
    name: string,
    accessToken: string,
    refreshToken: string
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REFRESH_ACCESS = 'REFRESH_ACCESS';
const REFRESH_REFRESH = 'REFRESH_REFRESH';

export const login = (accessToken: string, refreshToken: string, name: string, level: number) => ({
    type: LOGIN,
    payload: {
        accessToken,
        refreshToken,
        name,
        level
    }
});

export const logout = () => ({
    type: LOGOUT,
    payload: {
        accessToken: null,
        refreshToken: null,
        name: null,
        level: null
    }
})

export const refreshAccess = (accessToken: string) => ({
    type: REFRESH_ACCESS,
    payload: {
        accessToken
    }
})

export const refreshRefresh = (refreshToken: string) => ({
    type: REFRESH_REFRESH,
    payload: {
        refreshToken
    }
});

type CounterAction = {
    type: string,
    payload: {
        accessToken: string;
        refreshToken: string;
        level: number;
        name: string;
    }
}

function reducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case LOGIN:
            return { ...state, ...action.payload };
        case LOGOUT:
            return { ...state, accessToken: null, refreshToken: null };
        case REFRESH_ACCESS:
            return { ...state, accessToken: action.payload.accessToken };
        case REFRESH_REFRESH:
            return { ...state, refreshToken: action.payload.refreshToken };
        default:
            return state;
    }
}

export default reducer;

