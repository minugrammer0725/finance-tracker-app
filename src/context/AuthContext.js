import { createContext, useRecuder } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  // update or return a new state.
  switch (action.type) {
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer takes in 1) reducer function, 2) initial state
  const [state, dispatch] = useRecuder(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
