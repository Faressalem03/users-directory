import Cards from "./Cards/Cards";
import SearchBar from "./SearchBar/SearchBar";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("https://dummyjson.com/users?limit=9");
        setUsers(response.data.users);
      } catch (err) {
        setError("Could not load the users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const visibleUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  // The early returns
  if (loading) return <h3 className={styles.message}>Loading....</h3>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users Directory</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <Cards users={visibleUsers} />
    </div>
  );
}

export default Home;