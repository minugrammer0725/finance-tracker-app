import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(false);

    // sign in user.
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      // dispatch() LOGIN action.
      dispatch({
        type: "LOGIN",
        payload: res.user,
      });
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, login };
};
