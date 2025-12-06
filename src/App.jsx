import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddUser from "./Adduser.jsx";
import TrackUser from "./Trackuser.jsx";
import Leetcode from "./Leetcode.jsx";
import Codeforces from "./Codeforces.jsx";
import Codechef from "./Codechef.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />

        {/* MAIN TRACK USER ROUTE */}
        <Route path="/trackuser" element={<TrackUser />}>

          {/* CHILD ROUTES (INSIDE OUTLET) */}
          <Route path="leetcode" element={<Leetcode />} />
          <Route path="codeforces" element={<Codeforces />} />
          <Route path="codechef" element={<Codechef />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
