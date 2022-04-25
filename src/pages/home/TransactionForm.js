import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDoc, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    // save transaction to firestore database.
    console.log(uid, name, amount);
    addDoc({ uid, name, amount });
  };

  // clear form onSubmit.
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction.</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>name:</span>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>amount ($):</span>
          <input
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
