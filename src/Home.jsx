import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import { useNavigate } from "react-router";
import "./App.css";
import "./index.css";

function Home() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [Users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // STORE FULL USER

  useEffect(() => {
    if (!vantaEffect) {
      const effect = HALO({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0x000000,
        baseColor: 0x000000,
        amplitudeFactor: 1.2,
        size: 5.3,
        speed: 1.2,
        mouseEase: 1.1,
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();

  return (
    <div ref={vantaRef} className="vanta-bg">
      <h1 className="title">CP/DSA-TRACKER</h1>

      <div className="content">

        {/* HEADER */}
        <div className="user-row header-row">
          <div className="column"><h1 className="user">Username</h1></div>
          <div className="column"><img src="/leetcodes.png" width="40" height="40" alt="" /></div>
          <div className="column"><img src="/cf.png" width="40" height="40" alt="" /></div>
          <div className="column"><img src="/codechefwa.png" width="60" height="90" className="cc" alt="" /></div>
        </div>

        {/* USER ROWS */}
        <div className="table">
          {Users.map((u) => (
            <div
              key={u._id}
              className={`user-row ${selectedUser?._id === u._id ? "selected" : ""}`}
              onClick={() => setSelectedUser(u)}  // STORE THE WHOLE USER
            >
              <div className="usernames">{u.username}</div>
              <div className="leetcode">{u.leetcodeid}</div>
              <div className="codeforce">{u.codeforcesid}</div>
              <div className="codechef">{u.codechefid}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="box-grid">

        {/* ADD USER */}
        <div className="user-box colored" onClick={() => navigate("/Adduser")}>
          Add User
        </div>

        {/* TRACK USER */}
        <div
          className="user-box dark"
          onClick={() => {
            if (!selectedUser) return alert("Please select a user first!");
            navigate("/Trackuser", { state: selectedUser }); // SEND DATA TO NEXT PAGE
          }}
        >
          Track User
        </div>

      </div>
    </div>
  );
}

export default Home;




