import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // wrapping with useRef, to prevent Infinite Loop triggered by useEffect.
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        // snapshot => collection at that moment.
        let results = [];
        snapshot.docs.forEach((doc) =>
          // add the doc id attribute.
          results.push({ ...doc.data(), id: doc.id })
        );

        // update states.
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could Not Fetch the Data :(");
      }
    );

    // unsubscribe on unmount.
    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error };
};
