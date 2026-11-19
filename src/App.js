import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserDetails from "./Cards/UserDetails";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}