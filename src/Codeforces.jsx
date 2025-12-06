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

export default function Codeforces() {
  const { state: user } = useLocation();
  const handle = user?.codeforcesid;

  const [info, setInfo] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [heatmap, setHeatmap] = useState({});

  // HEATMAP GENERATION FOR 365 DAYS
  function generateHeatmap(submissions) {
    const map = {};

    // Generate past 365 days with default 0
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      map[dateStr] = 0;
    }

    // Count submissions
    submissions.forEach((sub) => {
      const date = new Date(sub.creationTimeSeconds * 1000)
        .toISOString()
        .slice(0, 10);
      if (map[date] !== undefined) map[date] += 1;
    });

    return map;
  }

  useEffect(() => {
    async function load() {
      try {
        // USER INFO
        const res1 = await fetch(
          `https://codeforces.com/api/user.info?handles=${handle}`
        );
        const json1 = await res1.json();

        // RATING HISTORY
        const res2 = await fetch(
          `https://codeforces.com/api/user.rating?handle=${handle}`
        );
        const json2 = await res2.json();

        // LAST 1000 SUBMISSIONS (or more if you want)
        const res3 = await fetch(
          `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
        );
        const json3 = await res3.json();

        if (json1.status === "OK") setInfo(json1.result[0]);
        if (json2.status === "OK") setRatingData(json2.result);

        if (json3.status === "OK") {
          setSubmissions(json3.result);
          setHeatmap(generateHeatmap(json3.result));
        }
      } catch (e) {
        console.error("Error fetching CF data", e);
      }
    }

    load();
  }, []);

  if (!info || !ratingData.length)
    return <p style={{ color: "white" }}>Loading Codeforces Stats...</p>;

  // RATING GRAPH DATA
  const labels = ratingData.map((d) => d.contestId);
  const ratings = ratingData.map((d) => d.newRating);

  const data = {
    labels,
    datasets: [
      {
        label: "Rating Progress",
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

  return (
    <div style={{ color: "white", padding: "20px" }}>
      {/* USER INFO */}
      <h2>Codeforces User: {info.handle}</h2><br/>
      <p>Rank: {info.rank}</p><br/>
      <p>Current Rating: {info.rating}</p><br/>
      <p>Max Rating: {info.maxRating}</p><br/>
      <p>Max Rank: {info.maxRank}</p><br/>
      <p>Total Contests: {ratingData.length}</p><br/>

      <hr style={{ margin: "20px 0", borderColor: "white" }} />

      {/* RATING GRAPH */}
      <h3>Rating Graph</h3>
      <div style={{ width: "100%", height: "400px" }}>
        <Line data={data} options={options} />
      </div>

      <hr style={{ margin: "30px 0", borderColor: "white" }} />

      {/* LAST SUBMISSIONS */}
      <h3>Last Submissions</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ background: "#222" }}>
            <th style={{ padding: "8px", border: "1px solid gray" }}>Problem</th>
            <th style={{ padding: "8px", border: "1px solid gray" }}>Verdict</th>
            <th style={{ padding: "8px", border: "1px solid gray" }}>Lang</th>
            <th style={{ padding: "8px", border: "1px solid gray" }}>When</th>
          </tr>
        </thead>
        <tbody>
          {submissions.slice(0, 10).map((sub, i) => (
            <tr key={i} style={{ background: "#111", textAlign: "center" }}>
              <td style={{ padding: "8px", border: "1px solid gray" }}>
                {sub.problem.contestId}
                {sub.problem.index} – {sub.problem.name}
              </td>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid gray",
                  color: sub.verdict === "OK" ? "lightgreen" : "red",
                }}
              >
                {sub.verdict}
              </td>
              <td style={{ padding: "8px", border: "1px solid gray" }}>
                {sub.programmingLanguage}
              </td>
              <td style={{ padding: "8px", border: "1px solid gray" }}>
                {new Date(sub.creationTimeSeconds * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* HEATMAP */}
      <h2 style={{ marginTop: "20px", fontWeight: "bold" }}>Activity Heatmap</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(53, 12px)", // 53 weeks ~ 365 days
          gap: "3px",
          marginTop: "10px",
        }}
      >
        {Object.keys(heatmap)
          .sort()
          .map((day) => {
            const count = heatmap[day];
            let bg = "#1e1e1e";
            if (count >= 10)
              bg = "linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)";
            else if (count >= 5) bg = "#8b5cf6";
            else if (count >= 2) bg = "#3b82f6";
            else if (count >= 1) bg = "#1d4ed8";
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
