import { createStore } from 'redux';


const initialState = {
    level: 0,
    accessToken: null,
    refreshToken: null
};

type InfoState = {
    level: number,
    accessToken: string,
    refreshToken: string
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REFRESH_ACCESS = 'REFRESH_ACCESS';
const REFRESH_REFRESH = 'REFRESH_REFRESH';

export const login = (accessToken: string, refreshToken: string) => ({
    type: LOGIN,
    accessToken,
    refreshToken
});

export const logout = () => ({
    type: LOGOUT,
    accessToken: null,
    refreshToken: null
})

export const refreshAccess = (accessToken: string) => ({
    type: REFRESH_ACCESS,
    accessToken
})

export const refreshRefresh = (refreshToken: string) => ({
    type: REFRESH_REFRESH,
    refreshToken
});

type CounterAction =
    | ReturnType<typeof login>
    | ReturnType<typeof logout>
    | ReturnType<typeof refreshAccess>
    | ReturnType<typeof refreshRefresh>

function reducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case LOGIN:
            return { ...state, accessToken: state.accessToken, refreshToken: state.refreshToken };
        case LOGOUT:
            return { ...state, accessToken: null, refreshToken: null };
        case REFRESH_ACCESS:
            return { ...state, accessToken: state.accessToken };
        case REFRESH_REFRESH:
            return { ...state, refreshToken: state.refreshToken };
        default:
            return state;
    }
}

export default reducer;

