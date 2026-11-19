import styles from "./Cards.module.css";
import { Link } from "react-router-dom";

export default function Cards({ users }) {
  if (users.length === 0) return <p>No users found</p>;
  return (
    <div className={styles.grid}>
      {users.map((user) => {
        return (
          <Link key={user.id} to={`/users/${user.id}`} className={styles.link}>
            <div className={styles.card}>
              <img src={user.image} alt={user.firstName} />
              <div>
                <h3>{user.firstName + " " + user.lastName}</h3>
                <p className={styles.email}>{user.email}</p>
                <p>{user.company.name}</p>
                <p>{user.address.city}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
