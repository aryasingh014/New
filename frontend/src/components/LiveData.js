// LiveData.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveData = () => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:3001/opcua-data");
        setValue(response.data.value);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("⚠️ Failed to fetch data from server.");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h2 style={{ color: "#2E86C1" }}>🔄 Real-Time OPC UA Data</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p style={{ fontSize: 24 }}>
        {value !== null ? `📈 Sinusoid Value: ${value.toFixed(4)}` : "⏳ Loading..."}
      </p>
    </div>
  );
};

export default LiveData;
