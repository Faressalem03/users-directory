import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserDetails.module.css";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/users/${userId}`,
        );
        setUser(response.data);
      } catch (err) {
        setError("Could not load this user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (!user) return <p className={styles.message}>User not found</p>;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back to all users
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <img src={user.image} alt={user.firstName} className={styles.photo} />
          <div>
            <h1 className={styles.name}>
              {user.firstName} {user.lastName}
            </h1>
            <p className={styles.role}>
              {user.company.title} at {user.company.name}
            </p>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span>{user.email}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Phone</span>
            <span>{user.phone}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Age</span>
            <span>{user.age}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Department</span>
            <span>{user.company.department}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>University</span>
            <span>{user.university}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Address</span>
            <span>
              {user.address.address}, {user.address.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
