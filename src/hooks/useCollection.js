import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
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
  }, [collection]);

  return { documents, error };
};
