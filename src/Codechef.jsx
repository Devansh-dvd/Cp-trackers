import React from "react";

function Codechef() {
  return (
    <>
      <h2>Codeforces User: devansh_kodarr</h2>
      <br />
      <p>Global Rank: 45450</p>
      <br />
      <p>Country Rank: 42081</p>
      <br />
      <p>Current Rating: 1394</p>
      <br />
      <p>Max Rating: 1495</p>
      <br />
      <p>Total Contests: 32</p>
      <br />

      <hr style={{ margin: "20px 0", borderColor: "white" }} />

      <h1>Rating graph</h1>
      <br />
      <img src="/rating graph.png" width="1200" height="200" alt="" />
      <br />
      <br />
      <br />

      <h1>Heat Map</h1>
      <br />
      <img src="/heatmap.png" width="1200" height="200" alt="" />
      <br />
      <br />

      {/* ==================== TABLE (Dark + Bordered) ==================== */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#111",
          color: "white",
          fontSize: "18px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #444", padding: "10px" }}>Time</th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>
              Problem
            </th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>
              Result
            </th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>Lang</th>
          </tr>
        </thead>

        <tbody>
          {/* Row 1 */}
          <tr>
            <td style={{ border: "1px solid #444", padding: "10px" }}>–</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>
              <a href="#" style={{ color: "#4da6ff" }}>DIFFVAL</a>
            </td>
            <td style={{ border: "1px solid #444", padding: "10px", color: "red" }}>✖</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>C++</td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td style={{ border: "1px solid #444", padding: "10px" }}>–</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>
              <a href="#" style={{ color: "#4da6ff" }}>DIFFVAL</a>
            </td>
            <td style={{ border: "1px solid #444", padding: "10px", color: "red" }}>✖</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>C++</td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td style={{ border: "1px solid #444", padding: "10px" }}>–</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>
              <a href="#" style={{ color: "#4da6ff" }}>SPMISS</a>
            </td>
            <td style={{ border: "1px solid #444", padding: "10px", color: "lime" }}>✔ (100)</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>C++</td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td style={{ border: "1px solid #444", padding: "10px" }}>–</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>
              <a href="#" style={{ color: "#4da6ff" }}>GEMBUND</a>
            </td>
            <td style={{ border: "1px solid #444", padding: "10px", color: "lime" }}>✔ (100)</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>C++</td>
          </tr>

          {/* Row 5 */}
          <tr>
            <td style={{ border: "1px solid #444", padding: "10px" }}>–</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>
              <a href="#" style={{ color: "#4da6ff" }}>EQUALMEX</a>
            </td>
            <td style={{ border: "1px solid #444", padding: "10px", color: "lime" }}>✔ (100)</td>
            <td style={{ border: "1px solid #444", padding: "10px" }}>C++</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Codechef;
