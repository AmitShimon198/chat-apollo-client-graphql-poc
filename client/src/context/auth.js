import { useReducer, useContext, createContext } from "react";

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()
const authReducer = (state, action) => {
    switch (action.type) {
        case 'Login':
            localStorage.setItem('token', action.payload?.token);
            return {
                ...state,
                user: action.payload
            }
        case 'Logout':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null
            }
        default:
            return;
    }
}
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })
    return (<AuthDispatchContext.Provider value={dispatch}>
        <AuthStateContext.Provider value={state}>
            {children}
        </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>);
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)