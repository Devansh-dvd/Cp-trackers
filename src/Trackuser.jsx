import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./trackuser.css";
import Codeforces from "./codeforces";


export default function TrackUser() {
  const { state: user } = useLocation(); // gets props

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

  return (
    <div ref = {vantaRef} className="vanta-bg">

        <div className="w-full h-screen flex justify-center items-center">

      <h1 className="title">Track User: {user.username}</h1>

      <div className="content-box">

        {/* TABS USING ROUTER */}
        <div className="tabs">
  <NavLink to="leetcode" className={({ isActive }) => `tab-btn ${isActive ? "active" : ""}`} state={user}>
    <img src="/leetcodes.png" width="40" height="40" alt="" />
  </NavLink>

  <NavLink to="codeforces" className={({ isActive }) => `tab-btn ${isActive ? "active" : ""}`} state={user}>
    <img src="/cf.png" width="40" height="40" alt="" />
  </NavLink>

  <NavLink to="codechef" className={({ isActive }) => `tab-btn ${isActive ? "active" : ""}`} state={user}>
    <img src="/cc.png" width="40" height="40" alt="" />
  </NavLink>
</div>

<div className="divider-line"></div>

<div className="tab-content">
  <Outlet />
</div>

      </div>
    </div>
    </div>
  );
}
