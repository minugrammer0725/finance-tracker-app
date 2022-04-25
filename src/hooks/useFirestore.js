import { useState, useEffect, useReducer } from "react";
import { projectFirestore } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
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

  // add document
  const addDoc = (doc) => {};

  // delete document
  const deleteDoc = (id) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDoc, deleteDoc, response };
};
