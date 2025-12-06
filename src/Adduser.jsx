import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./adduser.css";
import HALO from "vanta/dist/vanta.halo.min";


export default function AddUser() {
  
    const vantaRef = useRef(null);
      const [vantaEffect, setVantaEffect] = useState(null);

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

  const handleSubmit = async (e) => {
  e.preventDefault();//reload nahi hoga page

  const formData = new FormData(e.target);

  const data = {
    username: formData.get("username"),
    leetcodeid: formData.get("leetcodeid"),
    codeforcesid: formData.get("codeforcesid"),
    codechefid: formData.get("codechefid"),
  };

  const res = await fetch("http://localhost:5000/adduser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log(result);

  alert("User added successfully!");
};

  return (
  <div ref={vantaRef} className="vanta-bg">

    <div className="w-full h-screen flex justify-center items-center">

      <div className="content-box">

        <h1 className="text-3xl font-bold text-center mb-6">User Details</h1>

        <form className="flex flex-col gap-4 text-lg" onSubmit={handleSubmit}>

          <label>Username</label>
          <input 
            name="username"
            className="p-2 rounded-lg bg-white/10 focus:outline-none"
            required
          />

          <label>LeetCode ID</label>
          <input 
            name="leetcodeid"
            className="p-2 rounded-lg bg-white/10 focus:outline-none"
          />

          <label>CodeForces ID</label>
          <input 
            name="codeforcesid"
            className="p-2 rounded-lg bg-white/10 focus:outline-none"
          />

          <label>CodeChef ID</label>
          <input 
            name="codechefid"
            className="p-2 rounded-lg bg-white/10 focus:outline-none"
          />

          <button 
            type="submit"
            className="mt-4 p-2 bg-white text-black rounded-lg font-semibold"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  </div>

);
}

