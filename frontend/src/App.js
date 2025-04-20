import React, { useState, useEffect } from "react";
import TagSelector from "./components/Dashboard/TagSelector";
import DateRangePicker from "./components/Dashboard/DateRangePicker";
import Graph from "./components/Dashboard/Graph";
import { fetchPLCData } from "./utils/fetchData";  // Updated import path
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

const PLCDashboard = () => {
  const [tag, setTag] = useState("Sinusoid1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [tags] = useState(["Sinusoid1", "Random1", "Triangle1"]);
  
  const [realTimeMode, setRealTimeMode] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState("ns=3;i=1001");
  const [opcuaData, setOpcuaData] = useState({});
  const [history, setHistory] = useState({});

  const fetchData = async () => {
    if (!from || !to) return;
    const result = await fetchPLCData(tag, from, to);
    setData(result.data);
  };

  useEffect(() => {
    if (!realTimeMode && from && to) {
      fetchData();
    }
  }, [tag, from, to, realTimeMode]);

  useEffect(() => {
    if (!realTimeMode) return;

    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("WebSocket connected.");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data && data.value && data.value.nodeId) {
        const nodeId = data.value.nodeId;
        const value = data.value.value;
        const timestamp = new Date().toLocaleTimeString();

        setOpcuaData((prev) => ({ ...prev, [nodeId]: value }));
        setHistory((prev) => ({
          ...prev,
          [nodeId]: [...(prev[nodeId] || []).slice(-9), { time: timestamp, value }],
        }));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => socket.close();
  }, [realTimeMode]);

  const realTimeChart = {
    labels: (history[selectedNodeId] || []).map((d) => d.time),
    datasets: [
      {
        label: `Real-time ${selectedNodeId}`,
        data: (history[selectedNodeId] || []).map((d) => d.value),
        fill: false,
        borderColor: "green",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">PLC Data Dashboard</h2>

      <div className="flex items-center gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={realTimeMode}
            onChange={() => setRealTimeMode(!realTimeMode)}
          />
          <span>Real-Time Mode</span>
        </label>
      </div>

      {!realTimeMode ? (
        <>
          <TagSelector selectedTag={tag} tags={tags} onChange={setTag} />
          <DateRangePicker
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
          <Graph data={data} />
        </>
      ) : (
        <div>
          <label>
            Select NodeId:{" "}
            <select
              className="border px-2 py-1"
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

          <div className="mt-4">
            <h3>🔄 Live Value: {opcuaData[selectedNodeId] ?? "Loading..."}</h3>
            <div className="max-w-xl mt-2">
              <Line data={realTimeChart} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PLCDashboard;
