import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionList = ({ transactions }) => {
  const { deleteDoc, response } = useFirestore("transactions");
  console.log(response);

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDoc(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
