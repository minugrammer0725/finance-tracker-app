import { useState, useEffect, useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADD_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// add / remove documents from firestore collection.
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // grab the collection we need
  const ref = projectFirestore.collection(collection);

  // helper function
  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add document
  const addDoc = async (doc) => {
    dispatch({
      type: "IS_PENDING",
    });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOC", payload: addedDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // delete document
  const deleteDoc = async (id) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDoc, deleteDoc, response };
};
