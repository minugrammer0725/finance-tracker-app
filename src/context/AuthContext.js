import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  // update or return a new state.
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer takes in 1) reducer function, 2) initial state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // function runs once when component is evaluated first, then unsubscribe.
  useEffect(() => {
    // onAuthStateChanged()
    const unsub = projectAuth.onAuthStateChanged((user) => {
      // user -> valid user | null
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    return () => unsub();
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
