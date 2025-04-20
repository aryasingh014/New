import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const nodeIds = [
  "ns=3;i=1001",
  "ns=3;i=1002",
  "ns=3;i=1003",
  "ns=3;i=1004",
  "ns=3;i=1005",
  "ns=3;i=1006",
  "ns=3;i=1007",
];

const App = () => {
  const [opcuaData, setOpcuaData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState("ns=3;i=1001");
  const [history, setHistory] = useState({});

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server.");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Received data:", data);

      if (data && data.value && data.value.nodeId) {
        const nodeId = data.value.nodeId;
        const value = data.value.value;
        const timestamp = new Date().toLocaleTimeString();

        setOpcuaData((prev) => ({
          ...prev,
          [nodeId]: value,
        }));

        // Update historical values
        setHistory((prevHistory) => ({
          ...prevHistory,
          [nodeId]: [
            ...(prevHistory[nodeId] || []).slice(-9), // keep last 9
            { time: timestamp, value },
          ],
        }));
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: (history[selectedNodeId] || []).map((d) => d.time),
    datasets: [
      {
        label: `Values for ${selectedNodeId}`,
        data: (history[selectedNodeId] || []).map((d) => d.value),
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>OPC UA Data Dashboard</h1>

      <div>
        <label>
          Select NodeId:{" "}
          <select
            value={selectedNodeId}
            onChange={(e) => setSelectedNodeId(e.target.value)}
          >
            {nodeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isConnected ? (
        <div>
          <h2>🔄 Real-Time Value</h2>
          <p>
            <strong>NodeId:</strong> {selectedNodeId} <br />
            <strong>Value:</strong>{" "}
            {opcuaData[selectedNodeId] !== undefined
              ? opcuaData[selectedNodeId]
              : "Loading..."}
          </p>

          <div style={{ maxWidth: "600px", marginTop: "30px" }}>
            <h3>📈 Historical Chart</h3>
            <Line data={chartData} />
          </div>
        </div>
      ) : (
        <p>🔌 Waiting for WebSocket connection...</p>
      )}
    </div>
  );
};

export default App;
