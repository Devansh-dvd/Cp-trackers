import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Leetcode() {
  const { state: user } = useLocation();
  const handle = user?.leetcodeid || "Devansh08122006";
  const [info, setInfo] = useState(null);
  const [heatmap, setHeatmap] = useState({});

  // Generate 365-day heatmap from submissionCalendar
  function generateHeatmap(calendar) {
    const map = {};
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      map[dateStr] = 0;
    }

    if (calendar) {
      Object.keys(calendar).forEach((key) => {
        const date = new Date(parseInt(key) * 1000).toISOString().slice(0, 10);
        if (map[date] !== undefined) map[date] = calendar[key];
      });
    }

    return map;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();

        setInfo(json);
        if (json.submissionCalendar) {
          setHeatmap(generateHeatmap(json.submissionCalendar));
        }
      } catch (err) {
        console.error("Error fetching LeetCode data:", err);
      }
    }

    fetchData();
  }, [handle]);

  if (!info) return <p style={{ color: "white" }}>Loading LeetCode Stats...</p>;

  // Contest data placeholder
  const contestData = info.contests || [];
  const labels = contestData.map((c) => c.name);
  const ratings = contestData.map((c) => c.rating);

  const data = {
    labels,
    datasets: [
      {
        label: "Contest Rating",
        data: ratings,
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,0.3)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    plugins: { legend: { labels: { color: "white" } } },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.2)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.2)" } },
    },
  };

  const totalSolved = info.totalSolved || 0;
  const easySolved = info.easySolved || 0;
  const mediumSolved = info.mediumSolved || 0;
  const hardSolved = info.hardSolved || 0;

  const maxHeat = Math.max(...Object.values(heatmap), 1);

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h2>LeetCode User: {info.username}</h2><br/>
      <p>Total Solved: {totalSolved}</p><br/>
      <p>Ranking: {info.ranking || 0}</p><br/>
      <p>Acceptance Rate: {info.acRate || 0}%</p><br/>
      <p>Contribution Points: {info.contributionPoints || 0}</p><br/>

      {/* Circular progress bars */}
      <h3 style={{ marginTop: "20px" }}>Problems Solved</h3>
      <div style={{ display: "flex", gap: "40px", marginTop: "10px" }}>
        {[
          { type: "Easy", count: easySolved, color: "#22c55e" },
          { type: "Medium", count: mediumSolved, color: "#facc15" },
          { type: "Hard", count: hardSolved, color: "#f43f5e" },
        ].map((p, i) => {
          const radius = 50;
          const stroke = 10;
          const normalizedRadius = radius - stroke * 2;
          const circumference = normalizedRadius * 2 * Math.PI;
          const percent = totalSolved > 0 ? (p.count / totalSolved) * 100 : 0;
          const strokeDashoffset = circumference - (percent / 100) * circumference;

          return (
            <div key={i} style={{ textAlign: "center" }}>
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="#1e1e1e"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke={p.color}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  transform={`rotate(-90 ${radius} ${radius})`}
                />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16px"
                >
                  {p.count}
                </text>
              </svg>
              <div style={{ color: "white", marginTop: "5px" }}>{p.type}</div>
            </div>
          );
        })}
      </div>

      <hr style={{ margin: "20px 0", borderColor: "white" }} />

      {/* Contest Rating Chart */}
      {contestData.length > 0 && (
        <>
          <h3>Contest Ratings</h3>
          <div style={{ width: "100%", height: "400px" }}>
            <Line data={data} options={options} />
          </div>
        </>
      )}

      <hr style={{ margin: "30px 0", borderColor: "white" }} />

      {/* Activity Heatmap */}
      <h2 style={{ marginTop: "20px", fontWeight: "bold" }}>Activity Heatmap</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(53, 12px)",
          gap: "3px",
          marginTop: "10px",
        }}
      >
        {Object.keys(heatmap)
          .sort()
          .map((day) => {
            const count = heatmap[day];
            let bg = "#1e1e1e";
            if (count > 0) {
              const ratio = count / maxHeat;
              if (ratio >= 0.8)
                bg = "linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)";
              else if (ratio >= 0.5) bg = "#8b5cf6";
              else if (ratio >= 0.2) bg = "#3b82f6";
              else bg = "#1d4ed8";
            }
            return (
              <div
                key={day}
                title={`${day}: ${count} submissions`}
                style={{
                  width: "12px",
                  height: "12px",
                  background: bg,
                  borderRadius: "3px",
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
